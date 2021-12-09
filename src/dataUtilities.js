// import {
//   AuthGetResponse,
//   TransactionsGetResponse,
//   IdentityGetResponse,
//   InvestmentsHoldingsGetResponse,
//   AccountsGetResponse,
//   ItemGetResponse,
//   InstitutionsGetByIdResponse,
//   LiabilitiesGetResponse,
//   PaymentInitiationPaymentGetResponse,
//   AssetReportGetResponse,
//   AssetReport,
//   TransferGetResponse,
// } from "plaid/dist/api";

const formatCurrency = (number, code) => {
  if (number != null && number !== undefined) {
    return ` ${parseFloat(number.toFixed(2)).toLocaleString('en')} ${code}`
  }
  return 'no data'
}

export const authCategories = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Balance',
    field: 'balance',
  },
  {
    title: 'Account #',
    field: 'account',
  },
  {
    title: 'Routing #',
    field: 'routing',
  },
]

export const transactionsCategories = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Amount',
    field: 'amount',
  },
  {
    title: 'Date',
    field: 'date',
  },
]

export const identityCategories = [
  {
    title: 'Names',
    field: 'names',
  },
  {
    title: 'Emails',
    field: 'emails',
  },
  {
    title: 'Phone numbers',
    field: 'phoneNumbers',
  },
  {
    title: 'Addresses',
    field: 'addresses',
  },
]

export const balanceCategories = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Balance',
    field: 'balance',
  },
  {
    title: 'Subtype',
    field: 'subtype',
  },
  {
    title: 'Mask',
    field: 'mask',
  },
]

export const investmentsCategories = [
  {
    title: 'Account Mask',
    field: 'mask',
  },
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Quantity',
    field: 'quantity',
  },
  {
    title: 'Close Price',
    field: 'price',
  },
  {
    title: 'Value',
    field: 'value',
  },
]

export const liabilitiesCategories = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Type',
    field: 'type',
  },
  {
    title: 'Last Payment Date',
    field: 'date',
  },
  {
    title: 'Last Payment Amount',
    field: 'amount',
  },
]

export const itemCategories = [
  {
    title: 'Institution Name',
    field: 'name',
  },
  {
    title: 'Billed Products',
    field: 'billed',
  },
  {
    title: 'Available Products',
    field: 'available',
  },
]

export const accountsCategories = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Balance',
    field: 'balance',
  },
  {
    title: 'Subtype',
    field: 'subtype',
  },
  {
    title: 'Mask',
    field: 'mask',
  },
]

export const paymentCategories = [
  {
    title: 'Payment ID',
    field: 'paymentId',
  },
  {
    title: 'Amount',
    field: 'amount',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: 'Status Update',
    field: 'statusUpdate',
  },
  {
    title: 'Recipient ID',
    field: 'recipientId',
  },
]

export const assetsCategories = [
  {
    title: 'Account',
    field: 'account',
  },
  {
    title: 'Transactions',
    field: 'transactions',
  },
  {
    title: 'Balance',
    field: 'balance',
  },
  {
    title: 'Days Available',
    field: 'daysAvailable',
  },
]

export const transferCategories = [
  {
    title: 'Transfer ID',
    field: 'transferId',
  },
  {
    title: 'Amount',
    field: 'amount',
  },
  {
    title: 'Type',
    field: 'type',
  },
  {
    title: 'ACH Class',
    field: 'achClass',
  },
  {
    title: 'Network',
    field: 'network',
  },
  {
    title: 'Status',
    field: 'status',
  },
]

export const transformAuthData = data => {
  return data.numbers.ach.map(achNumbers => {
    const account = data.accounts.filter(a => {
      return a.account_id === achNumbers.account_id
    })[0]
    const balance = account.balances.available || account.balances.current
    const obj = {
      name: account.name,
      balance: formatCurrency(balance, account.balances.iso_currency_code),
      account: achNumbers.account,
      routing: achNumbers.routing,
    }
    return obj
  })
}

export const transformTransactionsData = data => {
  return data.transactions.map(t => {
    const item = {
      name: t.name,
      amount: formatCurrency(t.amount, t.iso_currency_code),
      date: t.date,
    }
    return item
  })
}

// interface IdentityData {
//   identity: IdentityGetResponse["accounts"];
// }

export const transformIdentityData = data => {
  const final = []
  const identityData = data.identity[0]
  identityData.owners.forEach(owner => {
    const names = owner.names.map(name => {
      return name
    })
    const emails = owner.emails.map(email => {
      return email.data
    })
    const phones = owner.phone_numbers.map(phone => {
      return phone.data
    })
    const addresses = owner.addresses.map(address => {
      return `${address.data.street} ${address.data.city}, ${address.data.region} ${address.data.postal_code}`
    })

    const num = Math.max(
      emails.length,
      names.length,
      phones.length,
      addresses.length
    )

    for (let i = 0; i < num; i++) {
      const obj = {
        names: names[i] || '',
        emails: emails[i] || '',
        phoneNumbers: phones[i] || '',
        addresses: addresses[i] || '',
      }
      final.push(obj)
    }
  })

  return final
}

export const transformBalanceData = data => {
  const balanceData = data.accounts
  return balanceData.map(account => {
    const balance = account.balances.available || account.balances.current
    const obj = {
      name: account.name,
      balance: formatCurrency(balance, account.balances.iso_currency_code),
      subtype: account.subtype,
      mask: account.mask,
    }
    return obj
  })
}

// interface InvestmentData {
//   error: null;
//   holdings: InvestmentsHoldingsGetResponse;
// }

export const transformInvestmentsData = data => {
  const holdingsData = data.holdings.holdings.sort(function (a, b) {
    if (a.account_id > b.account_id) return 1
    return -1
  })
  return holdingsData.map(holding => {
    const account = data.holdings.accounts.filter(
      acc => acc.account_id === holding.account_id
    )[0]
    const security = data.holdings.securities.filter(
      sec => sec.security_id === holding.security_id
    )[0]
    const value = holding.quantity * security.close_price

    const obj = {
      mask: account.mask,
      name: security.name,
      quantity: formatCurrency(holding.quantity, ''),
      price: formatCurrency(
        security.close_price,
        account.balances.iso_currency_code
      ),
      value: formatCurrency(value, account.balances.iso_currency_code),
    }
    return obj
  })
}

export const transformLiabilitiesData = data => {
  const liabilitiesData = data.liabilities
  const credit = liabilitiesData.credit.map(credit => {
    const account = data.accounts.filter(
      acc => acc.account_id === credit.account_id
    )[0]
    const obj = {
      name: account.name,
      type: 'credit card',
      date: credit.last_payment_date,
      amount: formatCurrency(
        credit.last_payment_amount,
        account.balances.iso_currency_code
      ),
    }
    return obj
  })

  const mortgages = liabilitiesData.mortgage?.map(mortgage => {
    const account = data.accounts.filter(
      acc => acc.account_id === mortgage.account_id
    )[0]
    const obj = {
      name: account.name,
      type: 'mortgage',
      date: mortgage.last_payment_date,
      amount: formatCurrency(
        mortgage.last_payment_amount,
        account.balances.iso_currency_code
      ),
    }
    return obj
  })

  const student = liabilitiesData.student?.map(student => {
    const account = data.accounts.filter(
      acc => acc.account_id === student.account_id
    )[0]
    const obj = {
      name: account.name,
      type: 'student loan',
      date: student.last_payment_date,
      amount: formatCurrency(
        student.last_payment_amount,
        account.balances.iso_currency_code
      ),
    }
    return obj
  })

  return credit.concat(mortgages).concat(student)
}

export const transformTransferData = data => {
  const transferData = data.transfer
  return [
    {
      transferId: transferData.id,
      amount: transferData.amount,
      type: transferData.type,
      achClass: transferData.ach_class,
      network: transferData.network,
      status: transferData.status,
    },
  ]
}

// interface ItemData {
//   item: ItemGetResponse["item"];
//   institution: InstitutionsGetByIdResponse["institution"];
// }

export const transformItemData = data => {
  return [
    {
      name: data.institution.name,
      billed: data.item.billed_products.join(', '),
      available: data.item.available_products.join(', '),
    },
  ]
}

export const transformAccountsData = data => {
  const accountsData = data.accounts
  return accountsData.map(account => {
    const balance = account.balances.available || account.balances.current
    const obj = {
      name: account.name,
      balance: formatCurrency(balance, account.balances.iso_currency_code),
      subtype: account.subtype,
      mask: account.mask,
    }
    return obj
  })
}

// interface PaymentData {
//   payment: PaymentInitiationPaymentGetResponse;
// }

export const transformPaymentData = data => {
  const statusUpdate =
    typeof data.payment.last_status_update === 'string'
      ? data.payment.last_status_update.replace('T', ' ').replace('Z', '')
      : new Date(data.payment.last_status_update * 1000) // Java data comes as timestamp
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '')
  return [
    {
      paymentId: data.payment.payment_id,
      amount: `${data.payment.amount.currency} ${data.payment.amount.value}`,
      status: data.payment.status,
      statusUpdate: statusUpdate,
      recipientId: data.payment.recipient_id,
    },
  ]
}

// interface AssetResponseData {
//   json: AssetReport;
// }

export const transformAssetsData = data => {
  const assetItems = data.json.items
  return assetItems.flatMap(item => {
    return item.accounts.map(account => {
      const balance = account.balances.available || account.balances.current
      const obj = {
        account: account.name,
        balance: formatCurrency(balance, account.balances.iso_currency_code),
        transactions: account.transactions.length,
        daysAvailable: account.days_available,
      }
      return obj
    })
  })
}
