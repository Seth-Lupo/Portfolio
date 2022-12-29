

export default () => {
    
    let schoolMap = {
        me: "Cornell",
        portfolio: "MIT",
        projects: "Tufts",
        stuff: "UMass Amherst",
    }
    
    let regex = /\/\w+/g
    let s = window.location.pathname
    let matches = s.match(/\w+/g)
   

    if (matches == null || matches.length == 0) {
        
        return false
    } else {
        
        let word = matches[0]
        if (word in schoolMap) {
            return schoolMap[word]
        } else {
            return false
        }
    }
    
    return 
}