// fetch nos permite hacer una petición a la siguiente dirección, movie/550 es el endpoint
// when we use fetch it returns a promise, a promise means thet we are creating a petition, el servidor esta haciendo recibiendo la peticion para procesarla y esperar a que termine
// usamos el await para decirle que haga la petición y cuando termine ahora si pase a la siguiente acción, solo se puede usar await en funciones asyncronas
// el try/catch que siempre que se utiliza async await, se usa el try/catch y lo que hace es intentar resolver un programa y en caso de tener un error el catch lo ejecuta

const loadMovies = async () => {
  try {
    const answer = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=0e73770fb198963fab9ff92aa5c0b1f2&language=es-MX"
    );
    console.log(answer);

    // con el methodo json(); podemos acceder a la informacion que nos devolvio la peticion, tambien es asyncrono
    if (answer.status === 200) {
      const data = await answer.json();
      // por cada pelicula me vas a ejecutar una funcion
      let movies = "";
      data.results.forEach((movie) => {
        movies += `
			<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
				<h3 class="titulo">${movie.title}</h3">
			</div>
		`;
      });

      document.getElementById("contenedor").innerHTML = movies;
    } else if (answer.status === 401) {
      console.log("Wrong key");
    } else if (answer.status === 404) {
      console.log("The movie doesn't exist");
    } else {
      console.log("Unknown error");
    }
  } catch (error) {
    console.log(error);
  }
};

loadMovies();
