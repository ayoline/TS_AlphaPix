interface Withdraw

{ 
  origin: {
    branch: string,
    account: string
  }, 
  amount: number,
  password: string
}

export { Withdraw };