export function getPointsRapportes(tabScoreResult, tabScoreProno){
  if(tabScoreResult[0] == tabScoreProno[0]){
    return 3
  }else{
    return 0
  }
}
