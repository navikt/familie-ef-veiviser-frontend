
interface Props {
    title: string;
}

const SuccessIkon: React.FC<Props> = ({title}) =>
            <svg
                width="1.75rem"
                height="1.75rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable={false}
                role="img"
                aria-labelledby={title}
                aria-hidden={true}
            >
                {title ? <title id={title}>{title}</title> : null}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12Zm-5.554-2.9-1.4-1.429-7.332 7.032-2.319-2.118L6 14.018 9.718 17.5 18.446 9.1Z"
                    fill="#007C2E"
                />
            </svg>;

export default SuccessIkon;
