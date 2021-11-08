export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  Seller = 'seller',
}

export enum PaymentMethod {
  COD = 'cash on delivery',
  BANKTRANSFER = 'Bank Transfer'
}

export enum StatusPayment {
  AWAITINGPAYMENT = 'Awaiting Payment',
  VALIDATIONPROCESS = 'Validation Process',
  VALIDATIONSUCCESS = 'Validation Success',
  PAID = 'PAID',
  CANCELED = 'Cancel'
}

export enum StatusOrder {
  ORDER = 'Order',
  ONGOING = 'Ongoing',
  DONE = 'Done'
}


export enum Imagedefault {
  IMAGE_DEFAULT = 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg'
}