function ProjectsCreation(input) {
    let project = 3;
    let name = input[0];
    let numberprojects = Number(input[1]);
    let hours = numberprojects * project;
    console.log( `The architect ${name} will need ${hours} hours to complete ${numberprojects} project/s ` );
}
ProjectsCreation(["Rosen", "4"]);
