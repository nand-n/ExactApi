import jwt from 'jsonwebtoken';
import prisma from '../../db';

//Admin Get The list of users
export const listUser = async (req, res) => {
   const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            isAdmin: true
        }
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"You cant! , Only admins can View List of Users!"
        })
    }
  try {
    const listOfUser = await prisma.user.findMany({})
  if (!listOfUser) {
    return res.status(400).json({ message: "There is no registered user" })
    
  }
    return res.status(200).json({listOfUser:listOfUser})
  } catch (error) {
    return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }

}
//Admin Get the detail of one user usign the user id
export const userShow = async(req, res) => {
  const { userId } = req.body

  const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            isAdmin: true
        }
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"You cant! , Only admins can View List of Users!"
        })
    }
  try {
    const user = await prisma.user.findUnique({
      where:{id:userId}
    })
    if (!user) {
      return res.status(400).json({message:"There is no user with the given user id,Please use a valid user!!!!"})
    }
    return res.status(200).json({message:`A detail about user :${user.username} : ${user}`})
  } catch (error) {
       return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }
}
//Admin Update the user using the user id 
export const updateUser = async (req, res) => {
    const { userId ,username , phone , isAdmin ,email} = req.body
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username,
        isAdmin: isAdmin,
        phone: phone,
        email: email,
      }
    })
    if (!user) {
      return res.status(400).json({message:"There is no user with the given user id,Please use a valid user!!!!"})
    }
    return res.status(200).json({message:`A Updated detail about user :${user.username} : ${user}`})
  } catch (error) {
       return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }
}
//Admin Delete User by admin
export const deleteUser = async (req, res) => {
    const { userId } = req.body;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUsr = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!adminUsr || !adminUsr.isAdmin) {
      return res.status(401).json({
        Message: 'The user is not admin, please sign in as an admin!',
      });
    }

    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      return res.status(404).json({ Message: 'User not found' });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      Message: 'The user was deleted successfully!',
      deletedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Message: `There was an error: ${error.message}`,
    });
  }
}

//Admin Create package
export const packageCreate = async (req, res) => {
  const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            isAdmin: true
        }
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"You cant! , Only admins can View List of Users!"
        })
    }
  try {
    
  } catch (error) {
    
  }
}



