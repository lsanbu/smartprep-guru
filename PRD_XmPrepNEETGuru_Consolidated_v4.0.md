
# Product Requirements Document (PRD)
## XmPrepNEETGuru - Consolidated MVP Specification v4.0

### Document Information
- **Version**: 4.0 (Consolidated & Finalized)
- **Date**: August 7, 2025
- **Author**: Product Team
- **Status**: Implementation Ready
- **Brand**: KDxAI powered
- **Target**: Production-ready MVP for local deployment

---

## 1. Executive Summary

### 1.1 Product Vision
XmPrepNEETGuru is an AI-powered Biology tutor specifically designed for NEET aspirants, delivering rapid, accurate, and syllabus-aligned doubt resolution through an intelligent chatbot interface.

### 1.2 MVP Goal
Launch a focused Biology Q&A system that can handle 1,000+ concurrent users with <3s response times, achieving >95% answer accuracy for NCERT-aligned questions.

### 1.3 Key Success Metrics
- **Performance**: <3s average query resolution time
- **Accuracy**: <5% flagged/incorrect answers
- **Engagement**: 70% daily active user retention
- **Scale**: Support 1,000 concurrent users reliably

---

## 2. Current Implementation Status

### 2.1 Implemented Core Features ✅
- **Chat Interface**: Real-time messaging with React-based UI
- **Flask API Integration**: Backend service connection established
- **Message Management**: Chat history with persistent state
- **UI Components**: Professional interface with KDxAI branding
- **Error Handling**: Basic error states and loading indicators
- **Mobile Responsive**: Adaptive design for all screen sizes

### 2.2 Partially Implemented Features 🔄
- **Image Upload**: UI ready, backend processing incomplete
- **Voice Input**: Interface components ready, no processing
- **Feedback System**: Visual elements present, no data collection
- **Subject Classification**: Basic detection, no syllabus mapping

### 2.3 Missing Critical Features ❌
- **Syllabus Integration**: No chapter/topic mapping
- **Tamil Language Support**: Translation workflow absent
- **Persistent Storage**: Chat history lost on refresh
- **Performance Optimization**: No caching or rate limiting
- **Fallback Mechanisms**: Single point of failure on API errors

---

## 3. Technical Architecture (Revised)

### 3.1 Frontend Stack (Current)
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS with KDxAI theme
- **UI Library**: Shadcn/ui components
- **State Management**: React Context + Custom hooks
- **Charts**: Recharts for analytics visualization

### 3.2 Backend Integration (Enhanced)
- **Primary**: Flask API + FAISS vector database
- **Fallback**: Cached responses for common queries
- **Storage**: SQLite for chat history (replacing JSON)
- **Authentication**: HMAC request signing
- **Rate Limiting**: 50 requests/minute per IP

### 3.3 Data Flow (Redesigned)
```
User Input → Language Detection → Syllabus Mapping → 
Context Enhancement → FAISS Query → RAG Processing → 
Response Generation → Translation (if needed) → UI Display
```

---

## 4. MVP Feature Specifications

### 4.1 Core Features (Must-Have)

#### A. Biology Syllabus Q&A System
**Status**: Enhance existing implementation
**Requirements**:
- Accept natural language questions in English/Tamil
- Retrieve NCERT-aligned answers using FAISS + RAG
- Provide chapter/topic references with each answer
- Support follow-up questions within context

**Data Structure**:
```typescript
interface SyllabusTopic {
  id: string;
  class: "11" | "12";
  unit: string;
  chapters: {
    id: string;
    title: string;
    ncert_ref: string[];
    topics: string[];
  }[];
}

interface ChatResponse {
  answer: string;
  confidence: number;
  syllabus_ref: {
    chapter: string;
    topic: string;
    ncert_page?: string;
  };
  sources: string[];
}
```

#### B. Syllabus Navigation & Breadcrumbs
**Status**: New implementation required
**Requirements**:
- Visual syllabus browser (Class 11 & 12 Biology)
- Breadcrumb navigation in chat interface
- Chapter-specific question routing
- Topic-based answer filtering

#### C. Tamil Language Support
**Status**: New implementation required
**Workflow**:
1. Detect input language (Tamil/English)
2. Translate Tamil input to English for processing
3. Process question through FAISS/RAG pipeline
4. Translate English response back to Tamil
5. Maintain original language preference

**Translation Requirements**:
- >90% BLEU score accuracy target
- Preserve technical terminology
- Maintain context in mathematical expressions

#### D. Enhanced Chat System
**Status**: Upgrade existing implementation
**New Features**:
- Persistent chat history (SQLite storage)
- Session management across browser refreshes
- Message search functionality
- Bookmark important answers
- Export chat history

#### E. Feedback & Quality Assurance
**Status**: Make existing UI functional
**Requirements**:
- "Was this helpful?" data collection
- Report incorrect/incomplete answers
- Flag system for content review
- User satisfaction tracking

### 4.2 Performance Features (Critical)

#### A. Caching Strategy
- **Query Cache**: Common questions cached for 24h
- **Session Cache**: User context maintained
- **Response Cache**: Processed answers stored locally
- **Fallback Cache**: Offline responses for network failures

#### B. Error Handling & Resilience
- **API Fallback**: Cached responses when Flask API fails
- **Graceful Degradation**: Basic responses without FAISS
- **Retry Logic**: Automatic retry with exponential backoff
- **User Communication**: Clear error messages with next steps

#### C. Load Management
- **Rate Limiting**: 50 API calls per minute per IP
- **Queue System**: Request queuing during high load
- **Resource Monitoring**: CPU/memory usage tracking
- **Auto-scaling**: Request distribution for local servers

### 4.3 Security & Compliance

#### A. API Security
- **HMAC Signing**: All requests cryptographically signed
- **Input Sanitization**: XSS and injection protection
- **Request Validation**: Schema-based input checking
- **Error Masking**: No sensitive data in error messages

#### B. Data Privacy
- **Session Isolation**: User data segregation
- **Data Retention**: 90-day automatic purge policy
- **No PII Storage**: Avoid personal information collection
- **Compliance Notice**: NCERT 2023-24 validation disclaimer

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Aug 10-15, 2025)
**Priority**: Critical infrastructure
- [ ] SQLite integration for chat persistence
- [ ] FAISS backend optimization and fallback
- [ ] Syllabus data structure implementation
- [ ] Basic error handling enhancement

### Phase 2: Core Features (Aug 16-22, 2025)
**Priority**: MVP functionality
- [ ] Syllabus navigation and breadcrumbs
- [ ] Enhanced chat context management
- [ ] Functional feedback system
- [ ] Performance caching implementation

### Phase 3: Language & Scale (Aug 23-28, 2025)
**Priority**: Market readiness
- [ ] Tamil language integration
- [ ] Load testing and optimization
- [ ] Security hardening (HMAC, rate limiting)
- [ ] Beta user onboarding system

### Phase 4: Polish & Launch (Aug 29-Sep 5, 2025)
**Priority**: Production deployment
- [ ] UI/UX refinements
- [ ] Documentation and runbooks
- [ ] Monitoring and analytics
- [ ] Disaster recovery procedures

---

## 6. Technical Requirements

### 6.1 System Architecture
```typescript
// Enhanced API Response Structure
interface EnhancedChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language: 'en' | 'ta';
  syllabus_context?: {
    class: "11" | "12";
    chapter: string;
    topic: string;
  };
  confidence_score?: number;
  sources?: string[];
  feedback?: 'helpful' | 'not_helpful' | 'reported';
}

// Syllabus Navigation State
interface SyllabusContext {
  current_class: "11" | "12";
  selected_chapter?: string;
  active_topic?: string;
  breadcrumb: string[];
}
```

### 6.2 Database Schema (SQLite)
```sql
-- Chat Sessions
CREATE TABLE chat_sessions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    language_preference TEXT DEFAULT 'en'
);

-- Messages
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES chat_sessions(id),
    content TEXT NOT NULL,
    sender TEXT CHECK(sender IN ('user', 'ai')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    language TEXT DEFAULT 'en',
    syllabus_class TEXT,
    syllabus_chapter TEXT,
    syllabus_topic TEXT,
    confidence_score REAL,
    feedback TEXT CHECK(feedback IN ('helpful', 'not_helpful', 'reported')),
    is_bookmarked BOOLEAN DEFAULT FALSE
);

-- Feedback Reports
CREATE TABLE feedback_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id TEXT REFERENCES messages(id),
    report_type TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.3 API Enhancement Specifications
```python
# Flask API Error Response Standard
{
    "error_code": "XP-{HTTP_CODE}",
    "user_message": "Tamil/English error message",
    "technical_details": "Internal error info",
    "suggested_action": "User guidance",
    "retry_after": "Seconds for retry"
}

# Enhanced Question Processing Pipeline
def process_question(user_input, context):
    # 1. Language Detection
    language = detect_language(user_input)
    
    # 2. Translation (if needed)
    english_query = translate_if_needed(user_input, language)
    
    # 3. Syllabus Context Enhancement
    syllabus_context = extract_syllabus_context(english_query, context)
    
    # 4. FAISS Vector Search
    relevant_docs = faiss_search(english_query, syllabus_context)
    
    # 5. RAG Response Generation
    response = generate_response(english_query, relevant_docs)
    
    # 6. Translation Back (if needed)
    final_response = translate_response(response, language)
    
    return final_response
```

---

## 7. Testing Strategy

### 7.1 Unit Testing
- **Components**: All chat UI components
- **Hooks**: Custom React hooks for state management
- **Utils**: Language detection and translation functions
- **API**: Flask endpoint response validation

### 7.2 Integration Testing
- **Chat Flow**: Complete user conversation cycles
- **Language Support**: Tamil-English translation accuracy
- **Syllabus Navigation**: Topic-specific question routing
- **Performance**: Response time under load

### 7.3 Load Testing
- **Concurrent Users**: 1,000+ simultaneous sessions
- **API Throughput**: 50 requests/min per user
- **Database Performance**: SQLite query optimization
- **Memory Usage**: Resource consumption monitoring

---

## 8. Deployment Requirements

### 8.1 Local Hosting Specifications
**Minimum Hardware**:
- **CPU**: 8-core processor (Intel i7 or AMD Ryzen 7)
- **RAM**: 16GB minimum (32GB recommended)
- **Storage**: 500GB SSD for FAISS indices
- **Network**: 100 Mbps uplink for concurrent users

**Software Requirements**:
- **OS**: Ubuntu 22.04 LTS or CentOS 8
- **Python**: 3.9+ with Flask, FAISS, LangChain
- **Node.js**: 18+ for frontend build
- **SQLite**: 3.35+ for data persistence

### 8.2 Production Checklist
- [ ] FAISS index optimization and compression
- [ ] SQLite database tuning and backup automation
- [ ] Nginx reverse proxy configuration
- [ ] SSL certificate installation
- [ ] Log rotation and monitoring setup
- [ ] Disaster recovery procedures documented

---

## 9. Success Metrics & Monitoring

### 9.1 Key Performance Indicators (KPIs)
**Technical Metrics**:
- Average response time: <3 seconds
- API uptime: >99.5%
- Error rate: <1% of requests
- Translation accuracy: >90% BLEU score

**User Experience Metrics**:
- Daily active users: Target 70% retention
- Session duration: >15 minutes average
- Questions per session: 5+ queries
- User satisfaction: >90% helpful ratings

**Business Metrics**:
- Total doubts resolved: Track cumulative count
- Syllabus coverage: Questions across all chapters
- Peak concurrent users: Maximum load handled
- Beta user feedback: Qualitative assessment

### 9.2 Monitoring Dashboard
- **Real-time**: Active users, response times, error rates
- **Daily Reports**: Usage patterns, popular topics, feedback
- **Weekly Analysis**: Performance trends, user growth
- **Monthly Review**: Feature adoption, system optimization

---

## 10. Risk Management & Mitigation

### 10.1 Technical Risks
**High Priority**:
- **FAISS Performance**: Load testing with 10GB+ indices
- **Translation Quality**: Manual review of 1000+ samples
- **Database Scalability**: SQLite limits at 100K+ records
- **API Reliability**: Comprehensive error handling

**Mitigation Strategies**:
- Implement comprehensive caching layers
- Add multiple fallback response mechanisms
- Regular performance benchmarking
- Automated testing pipelines

### 10.2 Business Risks
**Market Risks**:
- Competition from established players
- User adoption in Tamil-speaking regions
- Content accuracy and NCERT compliance

**Mitigation Approaches**:
- Focus on superior user experience
- Extensive beta testing with target users
- Expert content validation processes

---

## 11. Post-MVP Enhancement Pipeline

### Phase 2 (Q4 2025): Multi-Subject Expansion
- Add Chemistry and Physics modules
- Advanced multimedia support (diagrams, videos)
- Personalized learning path recommendations

### Phase 3 (Q1 2026): Advanced Features
- Adaptive testing and quiz generation
- Peer-to-peer doubt sharing
- Teacher/parent dashboard integration

### Phase 4 (Q2 2026): Scale & Intelligence
- Cloud migration for unlimited scaling
- Advanced AI personalization
- Multi-language support (Hindi, Telugu)

---

## 12. Conclusion & Next Steps

### 12.1 Implementation Priority
This consolidated PRD provides a clear roadmap for delivering a production-ready XmPrepNEETGuru MVP within 30 days. The focus remains on core Biology Q&A functionality while building scalable foundations for future expansion.

### 12.2 Immediate Actions Required
1. **Team Alignment**: Review and approve this PRD by August 8, 2025
2. **Architecture Freeze**: Finalize technical specifications by August 9
3. **Development Sprint**: Begin Phase 1 implementation August 10
4. **Daily Standups**: Track progress against roadmap milestones

### 12.3 Success Criteria
- **MVP Launch**: September 5, 2025
- **Beta Users**: 100+ active testers by September 15
- **Performance**: Meet all technical KPIs consistently
- **Feedback**: >90% user satisfaction in beta testing

---

**Document Status**: Final Specification - Implementation Ready
**Next Review**: Weekly progress reviews starting August 10, 2025
**Version Control**: All changes require team approval

---

**END OF DOCUMENT**
