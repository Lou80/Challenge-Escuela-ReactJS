const usersGrid = document.getElementById('users_grid');
const userProfile = document.getElementById('user_profile');
let users = '';
const loadMore = document.querySelector('.button #load_more');
let page = 1;
const pageNumber = document.querySelector('#page_number');
const main = document.querySelector('main');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titleize = function() {
    var string_array = this.split(' ');
    string_array = string_array.map(function(str) {
       return str.capitalize(); 
    });
    
    return string_array.join(' ');
}

const getHome = () => {
fetch(`https://randomuser.me/api/?page=${page}&results=54&inc=name,location,email,login,dob,picture,nat`)
.then(res => res.json() )
.then( data => {
    users = data.results;
    pageNumber.innerHTML = `${page}`;
    users.forEach(u => {
       const fullName = `${u.name.first} ${u.name.last}`.titleize();
       const city = `${u.location.city}`.titleize();
       fetch(`https://restcountries.eu/rest/v2/alpha/${u.nat}`)
        .then(res => res.json() )
        .then( data => {
            const country = data.name;
            usersGrid.innerHTML +=
            `<div class="user_thumbnail flex" id="${u.login.uuid}" onclick="openProfile(this)" > 
                <div class="img_home">
                    <img src="${u.picture.thumbnail}">
                </div>
                <div class="data_home">
                    <p>${fullName.trim()}</p>
                    <div class="city_line">
                    <i class="fas fa-map-pin"></i><span class="city"> ${city.trim()}</span>
                    </div>
                    <i class="fas fa-globe-americas"></i><span class="nation"> ${country}</span>
                </div>
            </div>`;
        })
    })
});
}

getHome();

const openProfile = (u) => {
    const profile = users.find(user => user.login.uuid === u.id);
    const profileName = `${profile.name.first} ${profile.name.last}`.titleize();
    userProfile.innerHTML = `<div class="profile">
        <div id="background">
        <span id="close" onclick="closeProfile()"><i class="far fa-times-circle"></i></span>
        </div>
        <div id="img_profile">
            <img src="${profile.picture.large}"
        </div>
        <div class="profile_data">
            <p id="profile_name">${profileName}</p>
            <p id="user">${profile.login.username}</p>    
            <p id="email" class="hidden">${profile.email}</p> 
            <p id="send"><i class="fas fa-envelope"></i><span onmouseover="view_email()" onmouseout="hide_email()"> Send email<span> 
        </div>
    </div>`;
    
    usersGrid.classList.add('opacity');
    userProfile.classList.remove('hidden');
}

const closeProfile = () => {
    userProfile.innerHTML = '';
    usersGrid.classList.remove('opacity');
    userProfile.classList.add('hidden');
}

loadMore.onclick = () => {
    page += 1;
    usersGrid.innerHTML = '';
    getHome();
}

const view_email = () => {
    document.querySelector("#send").classList.add("hidden");
    document.querySelector("#email").classList.remove("hidden");
}

const hide_email = () => {
    document.querySelector("#send").classList.remove("hidden");
    document.querySelector("#email").classList.add("hidden");
}