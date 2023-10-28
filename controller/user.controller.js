

// Retourne tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    try{
        // const users = find();
        res.send(users)
    } catch(error){
        console.log('Error in fetching users', error);
        res.status(500).json({ error: 'Error in fetching users' });
    }
};

// Retourne utilisateur ID
module.exports.getUserId= async (req, res) => {
    try{
    //const user = findById
    } catch(error){
        return res.status(500).json({ message: "An error occurred while recovering the user" });
    }
};

// Met à jour les infos utilisateurs ID
module.exports.updateUser = async (req, res) => {
    try{
        // const user = findByIdAndUpdate()
    } catch(error){
        res.status(500).json({ message: "Failed to update member." });
    }
}

// Supprime l'utilisateur ID
module.exports.removeUserId = async (req, res) => {
    try{
    // const user = findByIdAndRemove()
    } catch(error){
        console.error("Error during member deletion:", error);
        res.status(500).json({ message: "An error occurred while deleting member." });
    }
}