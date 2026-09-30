// app/stores/movies.ts
import type { MoviesCollectionItem } from '@nuxt/content'

type Status = 'init' | 'loading' | 'success' | 'error'

export const useMoviesStore = defineStore('movies', () => {
  // Estado
  const movies = ref<MoviesCollectionItem[]>([])
  const movie = ref<MoviesCollectionItem | null>(null)
  const prev = ref<MoviesCollectionItem | null>(null)
  const next = ref<MoviesCollectionItem | null>(null)
  // Los favoritos se guardan en una cookie para que sobrevivan a la recarga
  // y el servidor los conozca al renderizar (el contador del encabezado coincide)
  const favorites = useCookie<number[]>('favorites', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })
  const status = ref<Status>('init')
  const error = ref<string | null>(null)

  // Getters
  const total = computed(() => movies.value.length)
  const isLoading = computed(() => status.value === 'loading')
  const favoriteMovies = computed(() =>
    movies.value.filter(m => favorites.value.includes(m.rank))
  )
  const averageRating = computed(() => {
    if (!movies.value.length) return 0
    const sum = movies.value.reduce((acc, m) => acc + m.rating, 0)
    return Math.round((sum / movies.value.length) * 100) / 100
  })

  // Ejecuta una tarea asincrónica y registra su estado (carga, éxito o error)
  async function run(task: () => Promise<void>) {
    status.value = 'loading'
    error.value = null
    try {
      await task()
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : String(e)
    }
  }

  // Acciones
  async function fetchMovies() {
    if (movies.value.length) return
    await run(async () => {
      movies.value = await queryCollection('movies').order('rank', 'ASC').all()
    })
  }

  async function fetchMovie(rank: number) {
    await run(async () => {
      movie.value = await queryCollection('movies').where('rank', '=', rank).first()
      if (!movie.value) return
      prev.value = await queryCollection('movies')
        .where('rank', '<', rank).order('rank', 'DESC').first()
      next.value = await queryCollection('movies')
        .where('rank', '>', rank).order('rank', 'ASC').first()
    })
  }

  // Se asigna un arreglo nuevo para que useCookie detecte el cambio y lo guarde
  function toggleFavorite(rank: number) {
    favorites.value = favorites.value.includes(rank)
      ? favorites.value.filter(r => r !== rank)
      : [...favorites.value, rank]
  }

  return {
    movies, movie, prev, next, favorites, status, error,
    total, isLoading, favoriteMovies, averageRating,
    fetchMovies, fetchMovie, toggleFavorite
  }
})
