import proxy from "express-http-proxy"

export const proxyWithHeader = (serviceUrl) => {
    if (!serviceUrl) {
        throw new Error("proxyWithHeader: serviceUrl is empty — set the corresponding ENV variable (e.g. CHAT_SERVICE)")
    }

    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userid
            }
            return proxyReqOpts
        },
    })
}