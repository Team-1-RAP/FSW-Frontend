import { wrapperProps } from './types'


const Wrapper = ({
    condition,
    className,
    children
}: wrapperProps) => {
    return condition ? <>{children}</> : <div className={className}>{children}</div>;
}

export default Wrapper