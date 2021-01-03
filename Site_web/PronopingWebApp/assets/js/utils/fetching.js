import { getPointsRapportes } from "./CalculPoints.js"

//const HOST = "http://localhost:8000";
const HOST = "https://pronoping.tristanpestiaux.com";


export async function getJoueurs(){
    const response = await fetch(HOST+"/api/joueurs/");
    if(response.ok){
        return await response.json();
    }
}

export async function getJoueur(id){
    const response = await fetch(HOST+"/api/joueurs/"+id);
    if(response.ok){
        return await response.json();
    }
}

export async function updateJoueur(id, points){
  const response = await fetch(HOST+"/api/joueurs/"+id,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
      "nbPoints": points
    })
  })
  return response.ok
}
export async function deleteJoueur(joueur){
  for(let i=0; i < joueur.pronostics.length; i++){
    await deletePronostic(joueur.pronostics[i].id)
  }
  const response = await fetch(HOST + '/api/joueurs/'+joueur.id,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return response.ok
}

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

export async function updateMatriculeListToClub(clubId, listMatricules){
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
export async function deleteEquipe(equipe){
  for(let i=0; i < equipe.rencontres.length; i++){
    await deleteRencontre(equipe.rencontres[i])
  }
  const response = await fetch(HOST + '/api/equipes/'+equipe.id,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return response.ok
}

export async function getRencontres(){
  const response = await fetch(HOST + "/api/rencontres?page=1");
  if(response.ok){
      return await response.json();
  }
}

export async function getRencontre(id){
      const response = await fetch(HOST+"/api/rencontres/"+id);
      if(response.ok){
          return await response.json();
      }
}

export async function postRencontre(equipe, adversaire, date){
  const response = await fetch(HOST + '/api/rencontres',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "equipe": equipe,
        "adversaire": adversaire,
        "date" : date,
        "isFinished" : false
    })
  });
  return response.ok;
}
export async function deleteRencontre(rencontre){
  for(let i=0; i < rencontre.pronostics.length; i++){
    await deletePronostic(rencontre.pronostics[i].id)
  }
  const response = await fetch(HOST + '/api/rencontres/'+rencontre.id,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return response.ok
}
export async function getPronostics(){
  const response = await fetch(HOST + "/api/pronostics?page=1");
  if(response.ok){
      return await response.json();
  }
}
export async function getPronostic(id){
    const response = await fetch(HOST+"/api/pronostics/"+id);
    if(response.ok){
        return await response.json();
    }
}

export async function postPronostic(joueur, rencontre, score){
  const response = await fetch(HOST + '/api/pronostics',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "joueur": joueur,
        "rencontre": rencontre,
        "score" : score,
        "isFinished" : false
    })
  });
  return response.ok;
}

export async function deletePronostic(id){
  const response = await fetch(HOST + '/api/pronostics/'+id,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  return response.ok
}

export async function addScoreRencontre(rencontreId, score){
  const response = await fetch(HOST+"/api/rencontres/"+rencontreId,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
        "score": score,
        "isFinished" : true
    })
  });
  return response.ok;
}

export async function updatePoint(rencontreId){
  const rencontre = await getRencontre(rencontreId);
  for(let i=0; i<rencontre.pronostics.length; i++){
    let points = getPointsRapportes(rencontre.score, rencontre.pronostics[i].score)
    await fetch(HOST+"/api/pronostics/"+rencontre.pronostics[i].id,{
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
        "pointsRapportes": points
      })
    })
    let joueurId = rencontre.pronostics[i].joueur.substring(13);
    let joueur = await getJoueur(joueurId);
    let pointsJoueur = joueur.nbPoints ? joueur.nbPoints : 0;
    let newPointsJoueur = pointsJoueur + points;
    var response = await updateJoueur(joueurId, newPointsJoueur)
    if(!response){
      return false
    }
  }
  return true
}

export async function updatePreviousPronostics(joueur){
  var tabPronostics = joueur.pronostics;
  for(let i=0; i < tabPronostics.length; i++){
    if(!tabPronostics[i].isFinished){
      let rencontre = await getRencontre(tabPronostics[i].rencontre.substring(16))
      if(rencontre.isFinished){
        closePronostic(tabPronostics[i].id).then(response => {
          if(!response){
            return false
          }
        })
      }
    }
  }
  return true
}

export async function closePronostic(pronosticId){
  const response = await fetch(HOST+"/api/pronostics/"+pronosticId,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
        "isFinished" : true
    })
  });
  return response.ok;
}


export async function connection(username, password){
  var formData = new FormData();
  formData.append('_username', username);
  formData.append('_password', password);
  const response = await fetch(HOST + '/login',{
    method: 'POST',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  })
  const body = await response.text()
  return body.length == 51116
}

export async function updateUsername(id, username){
  var club = await getClub(1);
  for(let i=0; i < club.joueurs.length; i++){
    if(club.joueurs[i].username == username){
      return "usernameError"
    }
  }
  const response = await fetch(HOST+'/api/joueurs/'+id,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
        "username": username,

    })
  });
  return response.ok;
}
export async function updatePassword(id, password){
  const response = await fetch(HOST+'/api/joueurs/'+id,{
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json',
    },
    body: JSON.stringify({
        "password": password,

    })
  });
  return response.ok;
}
