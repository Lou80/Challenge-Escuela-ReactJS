const usersGrid = document.getElementById('users_grid');
const userProfile = document.getElementById('user_profile');
let users = '';

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


fetch('https://randomuser.me/api/?results=56&inc=name,location,login,picture,nat')
.then(res => res.json() )
.then( data => {
    users = data.results;
    users.forEach(u => {
       const fullName = `${u.name.first} ${u.name.last}`.titleize();
       const city = `${u.location.city}`.titleize();
       usersGrid.innerHTML += `<div class="user_thumbnail" id="${u.login.uuid}" onclick="openProfile(this)" > 
            <div class="img_home">
                <img src="${u.picture.thumbnail}">
            </div>
            <div class="data_home">
                <p>${fullName.trim()}</p>
                <span><i class="fas fa-map-pin"></i> ${city}</span>
                <span>${u.nat}</span>
            </div>
        </div>`;
    })
});

const openProfile = (u) => {
    const profile = users.find(user => user.login.uuid === u.id);
    userProfile.innerHTML = `<div class="profile">
    <span onclick="closeProfile()"><i class="far fa-times-circle"></i></span>
    <div class="img_profile">
        <img src="${profile.picture.large}"
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