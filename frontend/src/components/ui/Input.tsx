
interface InputTypes{
    placeholder: string,
    type?: string;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function Input({placeholder, ref, className, type}: InputTypes){
    return <div>
        <input ref={ref} placeholder={placeholder} type={type} className={className}
       ></input>
    </div>
}