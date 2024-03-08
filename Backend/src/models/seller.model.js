import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  whatsappNumber:{
    type:String,
    required:true
  },
  gstNumber:{
    type:String,
    required:true,
    unique:true
  },
  storeName:{
    type:String,
    required:true
  },
  storeLogo:{
    type:String
  },
  storeAddress:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  offers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }
  ]
})

const requestProductSchema = new mongoose.Schema({
  
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  skuid: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  category: {
    type: [String],
    enum:['anime', 'boots' , 'sneakers' , 'sandals'],
    required: true,
  },
  color:{
    type:[String],
    required:true
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
  tags:[
    {
      type:String
    }
  ]

})


const requestSchema = new mongoose.Schema({
  product: requestProductSchema,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Seller'
  }
}, {
  timestamps: true
})

const Seller = new mongoose.model('Seller', sellerSchema);
const Request = new mongoose.model('Request', requestSchema);

export { Seller, Request }

