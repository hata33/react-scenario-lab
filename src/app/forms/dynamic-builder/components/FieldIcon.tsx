"use client";

import React from "react";
import {
	Type,
	Calendar,
	Upload as UploadIcon,
	Mail,
	Phone,
	MapPin,
	Hash,
	FileText,
	Image,
	Video,
	Music,
	Link as LinkIcon,
	Star,
	ToggleLeft,
	Grid3x3,
	List,
	Users,
	CreditCard,
	Clock,
	Code,
	ChevronDown,
	CheckSquare,
	Radio,
	Check,
	Sliders,
	Palette,
	PenTool,
	Minus,
} from "lucide-react";

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

const FieldIcon: React.FC<FieldIconProps> = ({
	iconName,
	className = "w-4 h-4",
}) => {
	const IconComponent = iconMap[iconName];

	if (IconComponent) {
		return <IconComponent className={className} />;
	}

	// 对于没有对应图标的字段类型，返回默认图标
	return <div className={`${className} bg-gray-400 rounded`} />;
};

export default FieldIcon;
