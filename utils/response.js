const errorResponse = (res, status, message) => {
    return res.status(status).json({
        status: 'failed',
        message
    })
}

const successResponse = (res, status, data) => {
    return res.status(status).json({
        status: 'success',
        data
    })
}

module.exports = { errorResponse, successResponse };