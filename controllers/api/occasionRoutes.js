const router = require('express').Router();
const { Occasion } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new occasion
router.post('/', withAuth, async (req, res) => {
    try {
        const { name, date, location } = req.body;
        const newOccasion = await Occasion.create({
            name,
            date,
            location,
            user_id: req.session.user.id,
      });
  
      res.status(200).json(newOccasion);
    } catch (err) {
      res.status(400).json(err);
    }
});

//update occasion
router.put('/:id', withAuth, async (req, res) => {
    try {
        const { name, date, location } = req.body;
        const updatedOccasion = await Occasion.update({
            name,
            date,
            location,
        
      }, {
        where: {
            id: req.params.id,
        },
      },
      );
      res.status(200).json(updatedOccasion);
    } catch (err) {
      res.status(400).json(err);
    }
});

//delete an occasion
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const occasionData = await Occasion.destroy({
            where: {
                id: req.params.id,
              },
        });

    if (!occasionData) {
        res.status(404).json({ message: 'No occasion found with this id!'});
        return
    }
    res.status(200).json(occasionData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;