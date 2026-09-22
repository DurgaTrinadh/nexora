import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Trophy, 
  Kanban, 
  Table as TableIcon,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobApplication, JobStage } from '../../types';

const STAGES: { id: JobStage; label: string; color: string; badgeBg: string }[] = [
  { id: 'wishlist', label: 'Wishlist', color: '#94A3B8', badgeBg: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
  { id: 'applied', label: 'Applied', color: '#38BDF8', badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20' },
  { id: 'online_assessment', label: 'Online Assessment', color: '#06B6D4', badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  { id: 'interviewing', label: 'Interview Scheduled', color: '#8B5CF6', badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  { id: 'offer', label: 'Offer Received', color: '#10B981', badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  { id: 'rejected', label: 'Archived / Rejected', color: '#F43F5E', badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20' },
];

export const JobTrackerHub: React.FC = () => {
  const { userState, addJobApplication, updateJobStage, deleteJobApplication } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Job Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [packageCtc, setPackageCtc] = useState('');
  const [location, setLocation] = useState('');
  const [stage, setStage] = useState<JobStage>('applied');
  const [deadline, setDeadline] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    addJobApplication({
      company,
      role,
      packageCtc: packageCtc || '₹12 - 16 LPA',
      location: location || 'Bangalore / Remote',
      stage,
      deadline,
      jobUrl,
      notes,
      tags: tags.length > 0 ? tags : ['Direct Apply']
    });

    // Reset
    setCompany('');
    setRole('');
    setPackageCtc('');
    setLocation('');
    setStage('applied');
    setDeadline('');
    setJobUrl('');
    setNotes('');
    setTagsInput('');
    setIsAddModalOpen(false);
  };

  // Funnel calculations
  const totalJobs = userState.jobApplications.length;
  const oaCount = userState.jobApplications.filter(j => j.stage === 'online_assessment' || j.stage === 'interviewing' || j.stage === 'offer').length;
  const interviewCount = userState.jobApplications.filter(j => j.stage === 'interviewing' || j.stage === 'offer').length;
  const offerCount = userState.jobApplications.filter(j => j.stage === 'offer').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-brand-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Full Placement Pipeline Management</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Job Application Tracker
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Track deadlines, online assessments, interview schedules, and offers in one persistent Kanban pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'kanban' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Kanban Board View"
              >
                <Kanban className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'table' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Add Job Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white text-xs font-bold shadow-lg shadow-brand-500/25 hover:opacity-95 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recruitment Conversion Funnel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] uppercase font-bold text-slate-400">Total Tracked</span>
          <div className="text-2xl font-black text-white mt-1">{totalJobs}</div>
          <span className="text-[11px] text-slate-400">Applications</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] uppercase font-bold text-slate-400">OA Shortlist Rate</span>
          <div className="text-2xl font-black text-cyber-cyan mt-1">
            {totalJobs > 0 ? Math.round((oaCount / totalJobs) * 100) : 0}%
          </div>
          <span className="text-[11px] text-cyan-300">{oaCount} Candidates</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] uppercase font-bold text-slate-400">Interview Calls</span>
          <div className="text-2xl font-black text-purple-400 mt-1">
            {totalJobs > 0 ? Math.round((interviewCount / totalJobs) * 100) : 0}%
          </div>
          <span className="text-[11px] text-purple-300">{interviewCount} Reached</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] uppercase font-bold text-slate-400">Offers Secured</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{offerCount}</div>
          <span className="text-[11px] text-emerald-300 font-semibold">
            {offerCount > 0 ? 'Congratulations!' : 'In progress'}
          </span>
        </div>
      </div>

      {/* VIEW: KANBAN BOARD */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
          {STAGES.map(col => {
            const jobsInStage = userState.jobApplications.filter(j => j.stage === col.id);

            return (
              <div 
                key={col.id} 
                className="glass-panel rounded-2xl p-3 border border-slate-800 space-y-3 min-h-[500px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: col.color }} 
                    />
                    <h3 className="text-xs font-bold text-slate-200">{col.label}</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {jobsInStage.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {jobsInStage.map(job => (
                    <div
                      key={job.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-sm space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-bold text-white leading-tight">{job.company}</h4>
                          <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-1">{job.role}</p>
                        </div>
                        <button
                          onClick={() => deleteJobApplication(job.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition rounded"
                          title="Delete card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* CTC & Location */}
                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          <span>{job.packageCtc}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        {job.deadline && (
                          <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{job.deadline}</span>
                          </div>
                        )}
                      </div>

                      {/* Notes snippet */}
                      {job.notes && (
                        <p className="text-[10px] text-slate-400 italic bg-slate-950/60 p-1.5 rounded border border-slate-800/80 line-clamp-2">
                          "{job.notes}"
                        </p>
                      )}

                      {/* Quick stage mover dropdown */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Move:</span>
                        <select
                          value={job.stage}
                          onChange={e => updateJobStage(job.id, e.target.value as JobStage)}
                          className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700/80 rounded px-1.5 py-0.5 outline-none cursor-pointer hover:border-brand-400 transition"
                        >
                          {STAGES.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {jobsInStage.length === 0 && (
                    <div className="text-center py-8 text-[11px] text-slate-600 italic">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* VIEW: TABLE VIEW */
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">CTC Package</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {userState.jobApplications.map(job => (
                  <tr key={job.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-bold text-white">{job.company}</td>
                    <td className="py-3 px-4 text-slate-300">{job.role}</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{job.packageCtc}</td>
                    <td className="py-3 px-4">
                      <select
                        value={job.stage}
                        onChange={e => updateJobStage(job.id, e.target.value as JobStage)}
                        className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2 py-1 outline-none"
                      >
                        {STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{job.location}</td>
                    <td className="py-3 px-4 text-slate-400">{job.deadline || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteJobApplication(job.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Job Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-700/80 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyber-cyan flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Add Job Application</h3>
                <p className="text-xs text-slate-400">Track a new campus drive or off-campus opportunity</p>
              </div>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Google, Atlassian"
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role *</label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer (SDE-1)"
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Package CTC</label>
                  <input
                    type="text"
                    value={packageCtc}
                    onChange={e => setPackageCtc(e.target.value)}
                    placeholder="e.g. ₹24 - 30 LPA"
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore / Remote"
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={e => setStage(e.target.value as JobStage)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                  >
                    {STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Checklist</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Round 1 DSA scheduled on Wednesday. Practice Dynamic Programming."
                  rows={2}
                  className="w-full glass-input px-3.5 py-2 rounded-xl text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white text-xs font-bold shadow-lg shadow-brand-500/25 hover:opacity-95 transition"
                >
                  Add to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
