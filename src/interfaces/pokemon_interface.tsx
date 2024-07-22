
export interface IPokemon {
    name: string
    url: string
}
  
export interface IAllPokemon {
    count: number
    next: string
    previous: string
    results: IPokemon[]
}