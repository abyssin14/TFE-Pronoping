import { getPointsRapportes } from "./CalculPoints.js"

const HOST = "http://192.168.1.28:8000";

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

export async function getRencontres(){
  const response = await fetch(HOST + "/api/rencontres?page=1");
  if(response.ok){
      return await response.json();
  }}

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
    fetch(HOST+"/api/pronostics/"+rencontre.pronostics[i].id,{
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
    fetch(HOST+"/api/joueurs/"+joueurId,{
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
        "nbPoints": newPointsJoueur
      })
    })  }
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
