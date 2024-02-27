
interface Props {
    title: string;
}

const ErrorIkon: React.FC<Props> = ({title}) =>
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
                    d="M0 11.976C.013 5.372 5.395 0 11.999 0 18.639.013 24.012 5.406 24 12.022 23.986 18.627 18.603 24 12 24h-.023a11.924 11.924 0 0 1-8.48-3.531A11.923 11.923 0 0 1 0 11.976Zm17-3.547L15.571 7 12 10.572 8.429 7 7 8.429 10.572 12 7 15.571 8.429 17 12 13.428 15.571 17 17 15.571 13.428 12 17 8.429Z"
                    fill="#C30000"
                />
            </svg>;

export default ErrorIkon;
