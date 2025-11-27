'use client';

import { UploadCloudIcon, X } from 'lucide-react';
import * as React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import Spinner from './ui/spinner';

const variants = {
    base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-300 transition-colors duration-200 ease-in-out',
    image:
        'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-900 rounded-md',
    active: 'border-2',
    disabled: 'bg-gray-700 cursor-default pointer-events-none bg-opacity-30',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

type InputProps = {
    width?: number;
    height?: number;
    className?: string;
    value?: File | string;
    onChange?: (file?: File) => void | Promise<void>;
    disabled?: boolean;
    dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
    },
    fileInvalidType() {
        return 'Invalid file type.';
    },
    tooManyFiles(maxFiles: number) {
        return `You can only add ${maxFiles} file(s).`;
    },
    fileNotSupported() {
        return 'The file is not supported.';
    },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { dropzoneOptions, width, height, value, className, disabled, onChange },
        ref,
    ) => {
        const imageUrl = React.useMemo(() => {
            if (typeof value === 'string') {
                // in case a url is passed in, use it to display the image
                return value;
            } else if (value) {
                // in case a file is passed in, create a base64 url to display the image
                return URL.createObjectURL(value);
            }
            return null;
        }, [value]);

        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            acceptedFiles,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            accept: { 'image/*': [] },
            multiple: false,
            disabled,
            onDrop: (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                    void onChange?.(file);
                }
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = React.useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    imageUrl && variants.image,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                imageUrl,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = React.useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);

        return (
            <div className='relative'>
                {disabled && (
                    <div className='flex items-center justify-center absolute inset-y-0 h-full w-full bg-background/80 z-50'>
                        <Spinner size='lg' />
                    </div>
                )}
                <div
                    {...getRootProps({
                        className: dropZoneClassName,
                        style: {
                            width,
                            height,
                        },
                    })}
                >
                    {/* Main File Input */}
                    <input ref={ref} {...getInputProps()} />

                    {imageUrl ? (
                        // Image Preview
                        <img
                            className="h-full w-full rounded-md object-cover"
                            src={imageUrl}
                            alt={acceptedFiles[0]?.name}
                        />
                    ) : (
                        // Upload Icon
                        <div className="flex flex-col items-center justify-center text-center space-y-4 px-6">
                            <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-950/30">
                                <UploadCloudIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div className="space-y-2">
                                <div className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Upload Cover Image
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Click or drag file to this area to upload
                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 mb-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Recommended Specifications
                                    </div>
                                    <div className="text-xs space-y-1.5">
                                        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium">
                                                1920 × 1080px
                                            </span>
                                            <span className="text-gray-500">or</span>
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium">
                                                16:9 ratio
                                            </span>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400 pt-1">
                                            JPG, PNG, WebP • Max 10MB
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Remove Image Icon */}
                    {imageUrl && !disabled && (
                        <div
                            className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                void onChange?.(undefined);
                            }}
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-white/70 bg-black transition-all duration-300 hover:h-6 hover:w-6">
                                <X className="text-white/70" width={16} height={16} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Text */}
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            </div>
        );
    },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    return (
        <button
            className={twMerge(
                // base
                'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
                // color
                'border border-gray-600 bg-violet-500 text-gray-100 shadow hover:bg-violet-600',
                // size
                'h-6 rounded-md px-2 text-xs',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';

function formatFileSize(bytes?: number) {
    if (!bytes) {
        return '0 Bytes';
    }
    bytes = Number(bytes);
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { SingleImageDropzone };