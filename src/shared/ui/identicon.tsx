import * as jdenticon from "jdenticon"
import type React from "react"
import { type SVGProps, useEffect, useRef } from "react"

interface IdenticonProps extends SVGProps<SVGSVGElement> {
  value: string
  size?: number
}

const Identicon: React.FC<IdenticonProps> = ({ value, size = 40, ...props }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      jdenticon.update(svgRef.current, value)
    }
  }, [value])

  return <svg ref={svgRef} width={size} height={size} {...props} data-jdenticon-value={value} />
}

export default Identicon
