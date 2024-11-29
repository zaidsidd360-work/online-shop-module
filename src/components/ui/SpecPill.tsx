interface SpecPillProps {
  spec: Array<any>
}

const SpecPill = ({ spec }: SpecPillProps) => {

  const titleized = (str: string) => str.replace(/\b\w/g, char => char.toUpperCase());

  return (
    <div className="flex items-center bg-[#0000000F] gap-1 rounded-full px-2 text-sm md:multi-[gap-2;my-1;p-1;px-2;text-[16px]]">
      <p className="text-[#00000099]">{titleized(spec[0])}:</p>
      <p>{spec[1]}</p>
    </div>
  )
}

export default SpecPill
