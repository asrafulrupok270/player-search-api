const loadAllData =(id)=>{

    const inputElement= document.getElementById("input-value")
    document.getElementById("details").innerHTML = ""
    document.getElementById("male").classList.add("d-none")
    document.getElementById("female").classList.add("d-none")
    const inputValue = inputElement.value
    document.getElementById("spinner").classList.remove("d-none")
    const search = id || inputValue;
     const URL =  `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`
    // console.log(inputValue)
    fetch(URL)
    .then(res=>res.json())
    .then((data)=>{
        document.getElementById("spinner").classList.add("d-none")
        showAllData(data.player)})
}
const showAllData = (players)=>{
    document.getElementById("input-value").value = ""
    const container = document.getElementById("card")
    container.innerText = ""
    // console.log(players)
    players.forEach(players => {
        // console.log(players)
        const {strCutout,strPlayer,strTeam,idPlayer}=players
        const div = document.createElement("div")
        div.classList.add("col");
        div.innerHTML=`

        <div class="card h-100 mt-5 mb-5">
      <img src="${strCutout?strCutout: "https://picsum.photos/200/300" }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"> ${strPlayer}</h5>
        <p class="card-text"> Now Duty :  ${strTeam}</p>
      </div>
  <div class=" "> 
  <button   onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-danger ms-3 mb-5 px-4">Details</button>
<button onclick="delatePlayer('${idPlayer}')"   type="button" class="btn btn-info ms-3  mb-5 px-4">DELATE</button>
    </div>
        `
        container.appendChild(div)
     
        
        
    });

}
const singlePlayer =(id)=>{
    
    const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    console.log(URL)
    fetch(URL).then(res=>res.json()).then((data)=>showSinglePlayer(data.players[0]))

} 
const showSinglePlayer = (data)=>{
    console.log(data)
   const {strCutout,strPlayer,strTeam,idPlayer,strDescriptionEN,strGender}  = data


    // console.log(data)
    const container = document.getElementById("details")
    container.innerText = ""
    if(strGender==="Male"){
        const male = document.getElementById("male")
        male.classList.remove("d-none")
    }
    else{
        const female = document.getElementById("female")
        female.classList.remove("d-none")
    }
    const div = document.createElement("div")
         div.innerHTML=`

         <div class="card" style="width: 18rem;">
  <img src="${strCutout}" class="card-img-top" alt="...">
  <h5 class = "text-center"> ${strPlayer}</h5>
  <div class="card-body mb-5">
    <p class="card-text"> ${strDescriptionEN.slice(0,300)+"....."}</p>
  </div>
</div>
         
         
         `
         container.appendChild(div)
}
const delatePlayer = ()=>{
    const containerr = document.getElementById("details")
    containerr.innerText = ""
    document.getElementById("male").classList.add("d-none")
    document.getElementById("female").classList.add("d-none")
    const container = document.getElementById("card")
    container.innerText = ""


}

 loadAllData("ronaldo") 
