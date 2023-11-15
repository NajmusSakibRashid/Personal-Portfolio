const api=[
  "https://codeforces.com/api/user.status?handle=Najmus_Sakib_Rashid",
  "https://uhunt.onlinejudge.org/api/subs-user/1038553"
];

const attempted=document.querySelectorAll('.attempted');
const solved=document.querySelectorAll('.solved');

const showResult=(index,attemptedCount,solvedCount)=>{
  const attemptedVal=document.createElement('div');
  attemptedVal.innerText=attemptedCount;
  attempted[index].appendChild(attemptedVal);
  const solvedVal=document.createElement('div');
  solvedVal.innerText=solvedCount;
  solved[index].appendChild(solvedVal);
}

const processing=[
  (json)=>{
    const map = new Map();
      if(json.status=='OK'){
        for(submission of json.result){
          if(map.has(JSON.stringify(submission.problem))){
            map.get(JSON.stringify(submission.problem)).push(submission);
          }
          else{
            map.set(JSON.stringify(submission.problem),[submission]);
          }
        }
        // console.log("Total Problem Attempted: "+map.size);
        let solvedCount=0;
        for([key,value] of map){
          let solved=0;
          for(submission of value){
            if(submission.verdict=="OK")
              solved=1;
          }
          solvedCount+=solved;
        }
        showResult(0,map.size,solvedCount);
        // console.log("Total Problem Solved: "+solvedCount);
      }
  },
  (json)=>{
    const map=new Map();
    for(submission of json.subs){
      if(map.has(submission[1])){
        map.get(submission[1]).push(submission);
      }
      else{
        map.set(submission[1],[submission]);
      }
    }
    let solvedCount=0;
    for([key,value] of map){
      let solved=0;
      for(submission of value){
        if(submission[2]==90)
          solved=1;
      }
      solvedCount++;
    }
    showResult(1,map.size,solvedCount);
  }
];

const fetchData=async ()=>{
  for(let i=0;i<api.length;i++){
    const data=await fetch(api[i]).catch((err)=>{
      console.log(err);
    });
    if(data){
      const json=await data.json()
      processing[i](json);
    }
  }
}

fetchData();