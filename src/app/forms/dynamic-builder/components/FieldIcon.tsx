"use client";

import {
	Calendar,
	Check,
	CheckSquare,
	ChevronDown,
	Clock,
	Code,
	CreditCard,
	FileText,
	Grid3x3,
	Hash,
	Image,
	Link as LinkIcon,
	List,
	Mail,
	MapPin,
	Minus,
	Music,
	Palette,
	PenTool,
	Phone,
	Radio,
	Sliders,
	Star,
	ToggleLeft,
	Type,
	Upload as UploadIcon,
	Users,
	Video,
} from "lucide-react";
import type React from "react";

interface FieldIconProps {
	iconName: string;
	className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	text: Type,
	mail: Mail,
	shield: CreditCard,
	hash: Hash,
	phone: Phone,
	link: LinkIcon,
	"file-text": FileText,
	code: Code,
	"chevron-down": ChevronDown,
	"check-square": CheckSquare,
	radio: Radio,
	check: Check,
	"toggle-left": ToggleLeft,
	calendar: Calendar,
	clock: Clock,
	upload: UploadIcon,
	image: Image,
	video: Video,
	music: Music,
	sliders: Sliders,
	star: Star,
	palette: Palette,
	"map-pin": MapPin,
	users: Users,
	"credit-card": CreditCard,
	"pen-tool": PenTool,
	grid: Grid3x3,
	list: List,
	minus: Minus,
};

const FieldIcon: React.FC<FieldIconProps> = ({ iconName, className = "w-4 h-4" }) => {
	const IconComponent = iconMap[iconName];

	if (IconComponent) {
		return <IconComponent className={className} />;
	}

	// 对于没有对应图标的字段类型，返回默认图标
	return <div className={`${className} rounded bg-gray-400`} />;
};

export default FieldIcon;
