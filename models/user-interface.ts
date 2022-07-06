interface User

{ 
  id: string,
  name: string, 
  cpf: string, 
  email: string, 
  birthdate: string,
  all: boolean,
  password: string
}

export { User };