const HOST = "http://localhost:8000";

export async function getClubs(){
    const response = await fetch(HOST + "/api/clubs?page=1");
    if(response.ok){
        return await response.json();
    }
}

export async function getClub(id){
    const response = await fetch(HOST+"/api/clubs/"+id);
    if(response.ok){
        return await response.json();
    }
}

export async function addMatriculeToClub(clubId, listMatricules){
  const response = await fetch(HOST+"/api/clubs/"+clubId,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
        "listMatricules": listMatricules,

    })
  });
  return response.ok;

}


export async function getEquipes(){
    const response = await fetch(HOST + "/api/equipes?page=1");
    if(response.ok){
        return await response.json();
    }
}
export async function getEquipesInClub(clubId){
  var equipes = await getEquipes();
  var equipesInClub = [];
  for (let i=0; i < equipes.length; i++){
    if(equipes[i].club.id == clubId){
      equipesInClub.push(equipes[i])
    }
  }
  return equipesInClub;
}

export async function getEquipe(id){
    const response = await fetch(HOST+"/api/equipes/"+id);
    if(response.ok){
        return await response.json();
    }
}

export async function postEquipe(nom, division, clubId){
    const club = await getClub(clubId);
    const response = await fetch(HOST + '/api/equipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "nom": nom,
            "division": division,
            "club" : club
        })
    });
    return response.ok;
}

export async function postRencontre(equipe, adversaire){
  const response = await fetch(HOST + '/api/rencontres',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "equipe": equipe,
        "adversaire": adversaire,
        "isFinished" : false
    })
  });
  return response.ok;
}
