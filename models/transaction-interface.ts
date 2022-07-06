interface Transaction

{ 
  id: string,
  debit_part: string,
  credit_part: string,
  date: Date, 
  all: boolean
}

export { Transaction };