$(document).ready(function(){

    // Event handler for keyup event on the searchUser input field
    $("#searchUser").on('keyup', function(e){
        let username = e.target.value;

        // Make request to GitHub API to fetch user data
        $.ajax({
            url: 'https://api.github.com/users/'+ username,
            data:{
                client_id: 'Ov23li0bzbNweNt58JQO',
                client_secret: 'e321bdc8cdb5d2511c546b78f2fe21d2877042eb'
            }
        }).done(function(user){
            // Make request to fetch user's repositories
            $.ajax({
                url: 'https://api.github.com/users/'+ username+'/repos',
                data:{
                    client_id: 'Ov23li0bzbNweNt58JQO',
                    client_secret: 'e321bdc8cdb5d2511c546b78f2fe21d2877042eb',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                // Display the fetched repositories in the #repos element
                $.each(repos, function(index, repo){
                    $("#repos").append(`
                        <div class="card">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.fork_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                                </div>
                            </div>
                        </div>
                        `)
                })
            });
            
            // Display user profile information and latest repositories
            $("#profile").html(` 
                <div class="card border-primary mb-3" style="max-width: 100rem;">
                    <div class="card-header"><h3>${user.name}</h3></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge bg-dark">Public Repos: ${user.public_repos}</span>
                                <span class="badge bg-primary">Public Gists: ${user.public_gists}</span>
                                <span class="badge bg-success">Followers: ${user.followers}</span>
                                <span class="badge bg-info">Following: ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
               <h3 class="page-header">Latest Repos</h3>
               <div id="repos"></div>
            `);
        });
    });
});
