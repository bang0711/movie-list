const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGM1OThhNzdiMjlmODdiNTc3OTM3NDE5NTcyMjEwMyIsInN1YiI6IjYzZTBlOTE5OTk3NGVlMGI2M2YzNWMwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DTsn2fgscJdqt12_qlRcWRF7Ip2VgLPwzyWZJwQtjXI";
// const prisma = new PrismaClient();
// async function getSession() {
//   const session = await getServerSession(authOptions);
//   console.log(session);
// }

const authorize = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};

export async function getGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    authorize
  );

  if (!res.ok) {
    throw new Error("Failed to get genres list.");
  }

  return res.json();
}

export async function getMovies(page: number, type: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?page=${page}`,
    authorize
  );

  if (!res.ok) {
    throw new Error("Failed to get genres list.");
  }

  return res.json();
}
