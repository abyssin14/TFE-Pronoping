export function getPointsRapportes(tabScoreResult, tabScoreProno){
  if(tabScoreResult[0] == tabScoreProno[0] && tabScoreResult[1] == tabScoreProno[1]){
    return 15
  }
  if(tabScoreResult[0] > 8 && tabScoreProno[0] > 8){
    return 10
  }
  if(tabScoreResult[0] < 8 && tabScoreProno[0] < 8){
    return 10
  }
  return 0
}

export function checkScore(tabScore){
  if(tabScore[0] < 0 || tabScore[1] < 0){
    return false
  }
  if((parseInt(tabScore[0]) + parseInt(tabScore[1])) != 16){
    return false
  }
  return true
}
