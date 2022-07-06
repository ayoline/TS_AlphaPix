interface Statement

{ 
  id: string,
  branch: string,
  account: string,
  date: Date, 
  all: boolean,
  password: string
}

export { Statement };