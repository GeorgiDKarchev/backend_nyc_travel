import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//how strong the hashing of the password to be
//8 and 9 for development
//10 - 12 for production
const SALT_ROUNDS = 8;

const membersSchema = new mongoose.Schema({

    member_name: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true

    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 30,
        required: true
    },
    photo: {
        type: String
    },
    age:{
        type: Number,
        min: 18,
        max: 125
    },
    active_member:{
        type: Boolean,
        default: true,
    },
    phone: {
        type: Number
    },
    Address: [
        {
            street: {
                type: String,
            },
            appartment: {
                type: String,
            },
            zip_code: {
                type: Number,
            }
        }
    ]
 
}, { //add timestamp with date when data is being created or modified
    timestamps:true,
    toJSON: {
        transform: function(doc, retDoc) {
    //removes password from the json doc (password not visible in frontend)
            delete retDoc.password; 
            return retDoc;
        }
    }
});

//------------------------------------------------------------------------------
// index - ogranise data by ascending order
membersSchema.index({age: 1});
membersSchema.index({member_name: 1});


//------------------------Bcrypt- password hash----------------------------------
 //Middleware - hashing the password      
membersSchema.pre('save', async function (next) {   //pre saved hook
    //if the password has not change continue  =>
    if (!this.isModified("password")) return next ();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next ();
});

export default mongoose.model('Member', membersSchema);