const usersGrid = document.getElementById('users_grid');
const usersProfiles = document.getElementById('users_profiles');

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


fetch('https://randomuser.me/api/?results=50&inc=name,location,login,picture,nat')
.then(res => res.json() )
.then( data => {
   data.results.map(u => {
       const fullName = `${u.name.first} ${u.name.last}`.titleize();
       const city = `${u.location.city}`.titleize();
       usersGrid.innerHTML += `<div class="user_thumbnail" id="u_${u.login.uuid}" onclick="openProfile(this)" > 
            <div class="img_home">
                <img src="${u.picture.thumbnail}">
            </div>
            <div class="data_home">
                <p>${fullName}</p>
                <p><i class="fas fa-map-pin"></i> ${city}</p>
                <p>${u.nat}</p>
            </div>
        </div>
        <div class="hidden profile">${fullName}</div>`;
    })
    
});

const openProfile = (user) => user.nextSibling.nextSibling.classList.remove('hidden');