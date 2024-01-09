import User from '../model/user.js';
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
    try{
        // const salt = await bcrypt.gensalt(); //old concept    // generate a random string
        const hashedpassword = await bcrypt.hash(req.body.password, 10);

        const user = { username: req.body.username, name: req.body.name, password: hashedpassword }

        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return res.status(500).json({ msg: 'Error while signup the user' })
    }
}