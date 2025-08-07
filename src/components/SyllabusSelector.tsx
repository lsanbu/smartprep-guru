
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  ChevronDown,
  X,
  Target
} from "lucide-react";
import { SyllabusTopic, SyllabusContext } from '@/types/syllabus';
import { enhancedFlaskApi } from '@/services/enhancedFlaskApi';

interface SyllabusSelectorProps {
  onTopicSelect: (context: SyllabusContext) => void;
  currentContext?: SyllabusContext;
}

// Mock syllabus data
const mockSyllabusData: SyllabusTopic[] = [
  {
    id: "class-11",
    class: "11",
    unit: "Class 11 Biology",
    chapters: [
      {
        id: "ch1",
        title: "The Living World",
        ncert_ref: ["Chapter 1"],
        topics: ["Diversity of Living Organisms", "Taxonomic Categories", "Taxonomic Hierarchy"]
      },
      {
        id: "ch2",
        title: "Biological Classification",
        ncert_ref: ["Chapter 2"],
        topics: ["Kingdom Monera", "Kingdom Protista", "Kingdom Fungi", "Kingdom Plantae", "Kingdom Animalia"]
      },
      {
        id: "ch3",
        title: "Plant Kingdom",
        ncert_ref: ["Chapter 3"],
        topics: ["Algae", "Bryophytes", "Pteridophytes", "Gymnosperms", "Angiosperms"]
      },
      {
        id: "ch4",
        title: "Animal Kingdom",
        ncert_ref: ["Chapter 4"],
        topics: ["Porifera", "Cnidaria", "Platyhelminthes", "Nematoda", "Annelida", "Arthropoda", "Mollusca", "Echinodermata", "Chordata"]
      }
    ]
  },
  {
    id: "class-12",
    class: "12",
    unit: "Class 12 Biology",
    chapters: [
      {
        id: "ch5",
        title: "Sexual Reproduction in Flowering Plants",
        ncert_ref: ["Chapter 1"],
        topics: ["Pre-fertilization Structures", "Pollination", "Double Fertilization", "Post-fertilization Events"]
      },
      {
        id: "ch6",
        title: "Human Reproduction",
        ncert_ref: ["Chapter 2"],
        topics: ["Male Reproductive System", "Female Reproductive System", "Menstrual Cycle", "Fertilization and Implantation"]
      },
      {
        id: "ch7",
        title: "Reproductive Health",
        ncert_ref: ["Chapter 3"],
        topics: ["Reproductive Health Problems", "Population Explosion", "Birth Control", "Medical Termination of Pregnancy"]
      },
      {
        id: "ch8",
        title: "Principles of Inheritance and Variation",
        ncert_ref: ["Chapter 4"],
        topics: ["Mendel's Laws", "Linkage and Recombination", "Sex Determination", "Mutation"]
      }
    ]
  }
];

const SyllabusSelector: React.FC<SyllabusSelectorProps> = ({ onTopicSelect, currentContext }) => {
  const [syllabusData] = useState<SyllabusTopic[]>(mockSyllabusData);
  const [selectedClass, setSelectedClass] = useState<"11" | "12">("11");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const currentClassData = syllabusData.find(data => data.class === selectedClass);
  const currentChapter = currentClassData?.chapters.find(ch => ch.title === selectedChapter);

  const handleClassChange = (classLevel: "11" | "12") => {
    setSelectedClass(classLevel);
    setSelectedChapter("");
    setSelectedTopic("");
    updateContext(classLevel, "", "");
  };

  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    setSelectedTopic("");
    updateContext(selectedClass, chapter, "");
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    updateContext(selectedClass, selectedChapter, topic);
  };

  const updateContext = (classLevel: "11" | "12", chapter: string, topic: string) => {
    const context: SyllabusContext = {
      current_class: classLevel,
      selected_chapter: chapter || undefined,
      active_topic: topic || undefined,
      breadcrumb: [
        `Class ${classLevel}`,
        ...(chapter ? [chapter] : []),
        ...(topic ? [topic] : [])
      ].filter(Boolean)
    };
    onTopicSelect(context);
  };

  const clearSelection = () => {
    setSelectedChapter("");
    setSelectedTopic("");
    updateContext(selectedClass, "", "");
  };

  const getTotalChapters = () => {
    return syllabusData.reduce((total, classData) => total + classData.chapters.length, 0);
  };

  const getTotalTopics = () => {
    return syllabusData.reduce((total, classData) => 
      total + classData.chapters.reduce((chTotal, chapter) => chTotal + chapter.topics.length, 0), 0
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">Focus Syllabus</span>
          <Badge variant="outline" className="text-xs">
            {getTotalChapters()} chapters, {getTotalTopics()} topics
          </Badge>
        </div>
        {(selectedChapter || selectedTopic) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelection}
            className="text-gray-500 hover:text-red-600"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Selection Row */}
      <div className="flex items-center space-x-3">
        {/* Class Selection */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 min-w-[40px]">Class:</span>
          <Select value={selectedClass} onValueChange={handleClassChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chapter Selection */}
        <div className="flex items-center space-x-2 flex-1">
          <span className="text-sm text-gray-600 min-w-[55px]">Chapter:</span>
          <Select value={selectedChapter} onValueChange={handleChapterChange}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="All chapters" />
            </SelectTrigger>
            <SelectContent>
              {currentClassData?.chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.title}>
                  {chapter.title}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {chapter.topics.length} topics
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Topic Selection */}
        {selectedChapter && (
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-sm text-gray-600 min-w-[40px]">Topic:</span>
            <Select value={selectedTopic} onValueChange={handleTopicChange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent>
                {currentChapter?.topics.map((topic, index) => (
                  <SelectItem key={index} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Current Selection Badge */}
        {(selectedChapter || selectedTopic) && (
          <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>
              {selectedTopic ? `${selectedTopic}` : selectedChapter ? `${selectedChapter}` : ''}
            </span>
          </Badge>
        )}
      </div>

      {/* Breadcrumb */}
      {currentContext && currentContext.breadcrumb.length > 1 && (
        <div className="mt-2 text-xs text-gray-500">
          <span>Current focus: </span>
          {currentContext.breadcrumb.join(' → ')}
        </div>
      )}
    </div>
  );
};

export default SyllabusSelector;
