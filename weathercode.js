/**learned from youtube**/
const cityname=document.getElementById('cityname');
const temp=document.getElementById('temp');
const citysearch=document.getElementById('citysearch');
const btn=document.getElementById('btn-search');
const image=document.getElementById('icon');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    ftweather(citysearch.value);
    citysearch.value="";
})
const  ftweather= async (city)=>{
try{
     const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd0545e5cac01c06dafd03de8f10ec5`,
                      { mode:'cors'});
      const weatherdata= await response.json();
      console.log(weatherdata);
      const {name}=weatherdata;
      const {feels_like}=weatherdata.main;
      const {id,main}=weatherdata.weather[0];
      cityname.textContent=name;
      temp.textContent=Math.round(feels_like-273);                
      if(id<800)
      {
        image.src="rainy.png";
      }
      else if(id==800)
      {
        image.src="sun.png";
      }
      else if(id>800)
      {
        image.src="cloudy.png";
      }
    }
    catch(error){
        alert('city not found');
    }
}
window.addEventListener('load',()=>{
    let lat;
    let lon;
    const proxy="https://cors-anywhere.herokuapp.com/";
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
            lat=position.coords.latitude;
            lon=position.coords.longitude;
            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=9fd0545e5cac01c06dafd03de8f10ec5 `;
            fetch(api).then((response)=>{return response.json();}).then((data)=>{console.log(data);})
        })
    }
})