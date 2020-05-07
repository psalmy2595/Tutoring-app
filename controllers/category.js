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
                                data: createdSubject.name
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
}

exports.updateSubject = (req, res) => {
    const { subjectId } = req.params;
    const { name } = req.body;

    Subject.findByIdAndUpdate(subjectId, { name: name }, {new: true}, (err, updatedSubject) => {
        if (err) {
            return res.status(422).json({
                status: 'failed',
                message: error
            })
        }
        if (!updatedSubject) {
            return res.status(422).json({
                status: 'failed',
                message: 'Unable to find and update subject'
            })
        }

        return res.status(200).json({
            status: 'success',
            data: updatedSubject
        })
    })
}

exports.deleteSubject = (req, res) => {
    const { subjectId } = req.params;

    Subject.findByIdAndDelete(subjectId, (err, deletedSubject) => {
        if (err) {
            return res.status(422).json({
                status: 'failed',
                message: error
            })
        }
        if (!deletedSubject) {
            return res.status(422).json({
                status: 'failed',
                message: 'Unable to find and delete subject'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Subject deleted successfully'
        })
    })
}

exports.updateCategory = (req, res) => {
    const { title } = req.body;
    const { category } = req.params;

    Category.findOneAndUpdate({ title: category }, { title }, {new: true},  (err, updatedCategory) => {
        if (err) {
            return res.status(422).json({
                status: 'failed',
                message: err
            })
        }
        if (!updatedCategory) {
            return res.status(422).json({
                status: 'failed',
                message: 'Unable to find and update category'
            })
        }

        return res.status(200).json({
            status: 'success',
            data: updatedCategory.title
        })
    })
}

exports.deleteCategory = (req, res) => {
    const { category } = req.params;

    Category.findOne({ title: category }, (err, foundCategory) => {
        if (err) {
            return res.status(422).json({
                status: 'failed',
                message: err
            })
        }
        if (!foundCategory) {
            return res.status(422).json({
                status: 'failed',
                message: 'This category does not exist'
            })
        }

        foundCategory.remove((err, deletedCategory) => {
            return res.status(200).json({
                status: 'success',
                message: 'Successfully deleted category'
            })
        })
    })
    // Category.findOneAndDelete({ title: category },  (err, deletedCategory) => {
    //     if (err) {
    //         return res.status(422).json({
    //             status: 'failed',
    //             message: err
    //         })
    //     }
    //     if (!deletedCategory) {
    //         return res.status(422).json({
    //             status: 'failed',
    //             message: 'Unable to find and delete category'
    //         })
    //     }

    //     return res.status(200).json({
    //         status: 'success',
    //         message: 'Successfully deleted category'
    //     })
    // })
}
