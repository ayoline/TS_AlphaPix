interface Deposit

{ 
  destination: {
    branch: string,
    account: string
  }, 
  amount: number
}

export { Deposit };