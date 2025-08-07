import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Home,
  ArrowRight
} from "lucide-react";
import { SyllabusTopic, SyllabusContext } from '@/types/syllabus';
import { enhancedFlaskApi } from '@/services/enhancedFlaskApi';

interface SyllabusNavigationProps {
  onTopicSelect: (context: SyllabusContext) => void;
  currentContext?: SyllabusContext;
}

// Mock syllabus data - will be replaced by API call
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

// Type guard function to validate syllabus data
const isValidSyllabusData = (data: unknown): data is SyllabusTopic[] => {
  if (!Array.isArray(data)) return false;
  
  return data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    (item.class === '11' || item.class === '12') &&
    typeof item.unit === 'string' &&
    Array.isArray(item.chapters)
  );
};

const SyllabusNavigation: React.FC<SyllabusNavigationProps> = ({ onTopicSelect, currentContext }) => {
  const [syllabusData, setSyllabusData] = useState<SyllabusTopic[]>(mockSyllabusData);
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set(['class-11']));
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSyllabusStructure();
  }, []);

  const loadSyllabusStructure = async () => {
    setLoading(true);
    try {
      const response = await enhancedFlaskApi.getSyllabusStructure();
      if (response.data && isValidSyllabusData(response.data)) {
        setSyllabusData(response.data);
      } else {
        console.warn('Invalid syllabus data received, using mock data');
      }
    } catch (error) {
      console.warn('Using mock syllabus data due to API error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleClass = (classId: string) => {
    const newExpanded = new Set(expandedClasses);
    if (newExpanded.has(classId)) {
      newExpanded.delete(classId);
    } else {
      newExpanded.add(classId);
    }
    setExpandedClasses(newExpanded);
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const selectTopic = (classLevel: "11" | "12", chapter: string, topic?: string) => {
    const context: SyllabusContext = {
      current_class: classLevel,
      selected_chapter: chapter,
      active_topic: topic,
      breadcrumb: [
        `Class ${classLevel}`,
        chapter,
        ...(topic ? [topic] : [])
      ]
    };
    onTopicSelect(context);
  };

  const resetSelection = () => {
    const context: SyllabusContext = {
      current_class: "11",
      breadcrumb: []
    };
    onTopicSelect(context);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-600">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>NEET Biology Syllabus</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetSelection}
            className="text-gray-500 hover:text-green-600"
          >
            <Home className="w-4 h-4" />
          </Button>
        </CardTitle>
        
        {/* Breadcrumb */}
        {currentContext && currentContext.breadcrumb.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
            <Home className="w-3 h-3" />
            {currentContext.breadcrumb.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ArrowRight className="w-3 h-3" />
                <span className="font-medium">{crumb}</span>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading syllabus...</div>
        ) : (
          <div className="space-y-2">
            {syllabusData.map((classData) => (
              <Collapsible
                key={classData.id}
                open={expandedClasses.has(classData.id)}
                onOpenChange={() => toggleClass(classData.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      {expandedClasses.has(classData.id) ? (
                        <ChevronDown className="w-4 h-4 text-purple-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-purple-600" />
                      )}
                      <span className="font-semibold text-purple-800">
                        Class {classData.class} Biology
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                      {classData.chapters.length} chapters
                    </Badge>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2 ml-4 space-y-2">
                  {classData.chapters.map((chapter) => (
                    <Collapsible
                      key={chapter.id}
                      open={expandedChapters.has(chapter.id)}
                      onOpenChange={() => toggleChapter(chapter.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <div className="flex items-center space-x-2">
                            {expandedChapters.has(chapter.id) ? (
                              <ChevronDown className="w-3 h-3 text-green-600" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-green-600" />
                            )}
                            <span 
                              className="text-sm font-medium text-green-800 text-left cursor-pointer hover:text-green-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectTopic(classData.class, chapter.title);
                              }}
                            >
                              {chapter.title}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            {chapter.topics.length} topics
                          </Badge>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-1 ml-4 space-y-1">
                        {chapter.topics.map((topic, topicIndex) => (
                          <button
                            key={topicIndex}
                            onClick={() => selectTopic(classData.class, chapter.title, topic)}
                            className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-blue-50 rounded transition-colors text-gray-700 hover:text-blue-700"
                          >
                            • {topic}
                          </button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SyllabusNavigation;
