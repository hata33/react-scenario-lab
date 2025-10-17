export interface BpmnComponentProps {
	xml?: string;
	onLoad?: () => void;
	onError?: (error: Error) => void;
	className?: string;
	style?: React.CSSProperties;
}

export interface BpmnEditorProps extends BpmnComponentProps {
	readonly?: boolean;
}

export interface BpmnViewerProps extends BpmnComponentProps {
	zoom?: number;
	center?: boolean;
}
