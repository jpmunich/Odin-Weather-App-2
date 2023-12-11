(()=>{"use strict";const e=(e,t,s)=>{const i=document.createElement(e);return t.appendChild(i),i.innerText=s,i},t=(e,t,s)=>{const i=document.createElement(e);return i.classList.add(s),t.appendChild(i),i},s=(s,i,n,a)=>{const d=t("div",s,"weather-cell-container"),r=t("div",d,"icon-container"),m=t("div",d,"weather-text-container");t("img",r,"weather-cell-img").src=i,e("h6",m,n).classList.add("info-text");const c=e("h3",m,`${a}`);return c.classList.add("info-text"),c},i=(s,i,n,a,d)=>{const r=t("div",s,"forecast-cell-container");e("h4",r,n).classList.add("forecast-day");const m=t("div",r,"forecast-temp-container");e("h2",m,`${a} °F`).classList.add("temp-high"),e("h6",m,`${d} °F`).classList.add("temp-low"),t("img",r,"forecast-img").src=i};let n="imperial";const a=document.getElementById("content"),d=t("div",a,"top-content");!function(s,i,a,r){const m=t("div",d,"nav-container");e("h1",m,"Cloudy").setAttribute("id","weather-description-text"),e("h4",m,"Seattle").setAttribute("id","city-description-text"),e("p",m,"Monday, 27th Nov 2023 8:27 pm").setAttribute("id","date-description-text"),e("h1",m,"47 °F").classList.add("temperature-text");const c=e("button",m,"Display: °F");c.setAttribute("id","toggle-units"),c.addEventListener("click",(()=>{"imperial"===n?(n="metric",c.innerText="Display: °C"):"metric"===n&&(n="imperial",c.innerText="Display: °F")})),t("img",m,"weather-img").src="./images/cloudy.svg";const l=t("div",m,"search-container"),o=((e,t)=>{const s=document.createElement("input");return t.appendChild(s),s})(0,l);o.setAttribute("id","search-bar"),o.placeholder="Search",t("img",l,"search-img").src="./images/search.svg"}(),function(e,i,n,a,r,m,c,l){const o=t("div",d,"cell-container"),g=t("div",o,"left-cell-container"),u=t("div",o,"right-cell-container");s(g,"./images/sunrise.svg","Sunrise","7:30").setAttribute("id","sunrise-cell"),s(g,"./images/sunset.svg","Sunset","8:00").setAttribute("id","sunset-cell"),s(g,"./images/target.svg","Pressure","1040").setAttribute("id","pressure-cell"),s(g,"./images/wind.svg","Wind Direction","100°").setAttribute("id","wind-direction-cell"),s(u,"./images/thermometer.svg","Feels Like","17 °F").setAttribute("id","feels-like-cell"),s(u,"./images/droplet.svg","Humidity","58%").setAttribute("id","humidity-cell"),s(u,"./images/eye.svg","Visibility","10000m").setAttribute("id","visibility-cell"),s(u,"./images/wind.svg","Wind Speed","14 mph").setAttribute("id","wind-cell")}(),function(s,n){const d=t("div",a,"toggle-container");e("button",d,"Daily Forecast").setAttribute("id","toggle-forecast-daily");const r=t("div",a,"forecast-container");i(r,"./images/cloudy.svg","Sunday",s[0],n[0]),i(r,"./images/cloudy.svg","Monday",s[1],n[1]),i(r,"./images/cloudy.svg","Tuesday",s[2],n[2]),i(r,"./images/cloudy.svg","Wednesday",s[3],n[3]),i(r,"./images/cloudy.svg","Thursday",s[4],n[4])}([43,44,45,46,47,42,39],[39,40,42,42,42,39,34]);const r="170fee3662f94ec3d6b36434fe3d4c00";let m="imperial",c="Seattle";async function l(e){const t=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${r}&units=${m}`),s=await t.json(),{visibility:i,timezone:d,main:c,weather:l,name:o,wind:g,dt:u}=s,y=new Date(1e3*u+1e3*d).getDay(),p=new Date(1e3*u+1e3*d).getUTCHours(),h=new Date(1e3*u+1e3*d).toUTCString().slice(0,22);!function(e,t,s,i){const a=document.getElementById("weather-description-text"),d=document.getElementById("city-description-text"),r=document.getElementById("date-description-text"),m=document.getElementsByClassName("temperature-text")[0];a.innerText=e,d.innerText=t,r.innerText=s,"imperial"===n?m.innerText=`${i} °F`:"metric"===n&&(m.innerText=`${i} °C`)}(l[0].description,o,h,Math.round(c.temp));const v=new Date(1e3*s.sys.sunset+1e3*d).toUTCString().slice(-12,-7);!function(e,t,s,i,a,d,r,m){document.getElementById("sunrise-cell").innerText=`${e}`,document.getElementById("sunset-cell").innerText=`${t}`,document.getElementById("pressure-cell").innerText=`${s}mb`,document.getElementById("wind-direction-cell").innerText=`${i}°`;const c=document.getElementById("feels-like-cell");"imperial"===n?c.innerText=`${a} °F`:"metric"===n&&(c.innerText=`${a} °C`),document.getElementById("humidity-cell").innerText=`${d}%`,document.getElementById("visibility-cell").innerText=`${r}m`;const l=document.getElementById("wind-cell");"imperial"===n?l.innerText=`${m}mph`:"metric"===n&&(l.innerText=`${m} m/s`)}(new Date(1e3*s.sys.sunrise+1e3*d).toUTCString().slice(-12,-7),v,c.pressure,g.deg,Math.round(c.feels_like),c.humidity,i,Math.round(g.speed)),function(e){for(let t=0;t<document.getElementsByClassName("temp-high").length;t++)e[t]%7==0?document.getElementsByClassName("forecast-day")[t].innerText="Sunday":e[t]%7==1?document.getElementsByClassName("forecast-day")[t].innerText="Monday":e[t]%7==2?document.getElementsByClassName("forecast-day")[t].innerText="Tuesday":e[t]%7==3?document.getElementsByClassName("forecast-day")[t].innerText="Wednesday":e[t]%7==4?document.getElementsByClassName("forecast-day")[t].innerText="Thursday":e[t]%7==5?document.getElementsByClassName("forecast-day")[t].innerText="Friday":e[t]%7==6&&(document.getElementsByClassName("forecast-day")[t].innerText="Saturday")}([y+1,y+2,y+3,y+4,y+5]),function(e,t){const s=document.getElementsByClassName("weather-img")[0],i=Math.floor(2*Math.random());console.log(i),"Rain"===e||"Drizzle"===e?(a.style.backgroundImage="url(./images/rain.jpg)",s.src="./images/cloud-rain.svg"):"Clear"===e?(a.style.backgroundImage="url(./images/landscape.jpg)",s.src="./images/sun.svg"):"Thunderstorm"===e&&0===i?(a.style.backgroundImage="url(./images/lightning-strike.jpg)",s.src="./images/cloud-lightning.svg"):"Thunderstorm"===e&&1===i?(a.style.backgroundImage="url(./images/lightning.jpg)",s.src="./images/cloud-lightning.svg"):"Mist"===e||"Fog"===e?(a.style.backgroundImage="url(./images/cloudy-forest.jpg)",s.src="./images/droplet.svg"):"Clouds"===e?(a.style.backgroundImage="url(./images/cloudy-day.jpg)",s.src="./images/cloudy.svg"):"Smoke"===e||"Haze"===e?(a.style.backgroundImage="url(./images/cloudy-forest.jpg)",s.src="./images/alert-triangle.svg"):"Dust"===e||"Sand"===e?(a.style.backgroundImage="url(./images/desert.jpg)",s.src="./images/sun.svg"):"Snow"===e&&0===i?(a.style.backgroundImage="url(./images/snow.jpg)",s.src="./images/snowflake.svg"):"Snow"===e&&1===i?(a.style.backgroundImage="url(./images/snowy-forest.jpg)",s.src="./images/snowflake.svg"):(a.style.backgroundImage="url(./images/landscape.jpg)",s.src="./images/sun.svg"),"Clear"===e&&(t>=19||t<=8)&&(a.style.backgroundImage="url(./images/night-time.jpg)",s.src="./images/moon.svg")}(l[0].main,p),console.log(s)}async function o(e){const t=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e}&appid=${r}&units=${m}`),s=await t.json(),{list:i}=s;!function(e,t){for(let s=0;s<document.getElementsByClassName("temp-high").length;s++)"imperial"===n?(document.getElementsByClassName("temp-high")[s].innerText=`${e[s]} °F`,document.getElementsByClassName("temp-low")[s].innerText=`${t[s]} °F`):"metric"===n&&(document.getElementsByClassName("temp-high")[s].innerText=`${e[s]} °C`,document.getElementsByClassName("temp-low")[s].innerText=`${t[s]} °C`)}([Math.round(i[1].main.temp_max),Math.round(i[9].main.temp_max),Math.round(i[15].main.temp_max),Math.round(i[23].main.temp_max),Math.round(i[31].main.temp_max)],[Math.round(i[1].main.temp_min),Math.round(i[9].main.temp_min),Math.round(i[15].main.temp_min),Math.round(i[23].main.temp_min),Math.round(i[31].main.temp_min)])}document.getElementById("search-bar").addEventListener("keypress",(e=>{"Enter"===e.key&&(c=document.getElementById("search-bar").value,l(c),o(c))})),document.getElementById("toggle-units").addEventListener("click",(()=>{"imperial"===m?m="metric":"metric"===m&&(m="imperial"),l(c),o(c)})),a.style.backgroundImage="url(./images/landscape.jpg)",l("Seattle"),o("Seattle")})();