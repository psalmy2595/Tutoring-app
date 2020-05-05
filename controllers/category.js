const Subject = require('../models/subject');
const Category = require('../models/category');

exports.createSubject = (req, res) => {
    const categoryTitle = req.params.category;
    const subjectName = req.body.name;

    const createSubject = () => {
        const newSubject = new Subject({ name: subjectName })
        return newSubject.save()
    }

    createSubject()
    .then(createdSubject => {
        if (createdSubject) {
            try {
                Category.findOne({title: categoryTitle})
                .then(foundCategory => {
                    foundCategory.subjects.push(createdSubject);
                    foundCategory.save((err) => {
                        if(!err) {
                            res.json({
                                message: 'Subject created successfullly',
                                data: createdSubject.title
                            })
                        }
                    });
                })
            } catch (error) {
                res.json({
                    message: 'Error!',
                    error
                })
            }
        }
    })
}

exports.getSubjectById = (req, res) => {
    const { id, category } = req.params;
    
    Category.findOne({ title: category })
    .then(foundCategory => {
        if(!foundCategory) {
             return res.status(404).json({
                 message: 'Category does not exist',
             })
        }

        // the category has been found
        Subject.findById(id, (error, foundSubject) => {
            if (error) {
                return res.status(422).json({
                    message: 'Error!',
                    error
                })
            }
            if (!foundSubject) {
                return res.status(404).json({
                    message: 'Subject not found'
                })
            }

            return res.status(200).json({
                data: foundSubject
            })
        })
    }).catch(error => {
        return res.status(422).json({
            message: 'Error!',
            error
        })
    })
}

exports.getAllSubject = (req, res) => {
    const { category } = req.params

    Category.findOne({ title: category }).populate('subjects')
    .then(foundCategory => {
        if(!foundCategory) {
             return res.status(404).json({
                 message: 'Category does not exist',
             })
        }

        return res.json({
            data: foundCategory,
        })
    })
    .catch(error => {
        return res.status(422).json({
            error
        })
    })
}

exports.getAllCategory = (req, res) => {
    Category.find((err, response) => {
        if(err) {
            return res.status(422).json({
                error: err
            })
        }
        return res.status(200).json({
            data: response
        })
    })
}

exports.searchSubject = (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({
            message: 'Please add a name to search by'
        })
    }
    Subject.find({name: { $regex: name, $options: "i" } }).sort('name').exec((err, foundSubject) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        }

        if(!foundSubject) {
            return res.status(404).json({
                message: 'No subject with that name found'
            })
        }
        return res.status(200).json({
            data: foundSubject
        })
    })
    // Subject.find({ name: { $regex: name, $options: "i" } }, (err, foundSubject) => {
    //     if (err) {
    //         return res.status(422).json({
    //             error: err
    //         })
    //     }

    //     if(!foundSubject) {
    //         return res.status(404).json({
    //             message: 'No subject with that name found'
    //         })
    //     }
    //     return res.status(200).json({
    //         data: foundSubject
    //     })
    // })
}