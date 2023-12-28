import React from 'react'
import { AnimatePresence,animate,motion } from 'framer-motion'

const AnimationWrapper = ({children,initial = {opacity:0},
animate = {opacity:1}, transition = {duration:1},keyvalue
}) => {
  return (
    <motion.div
    key={keyvalue}
    initial={initial}
    animate={animate}
    transition={transition}
    >{children}</motion.div>
  )
}

export default AnimationWrapper


