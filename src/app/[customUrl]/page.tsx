import React from 'react';
import { notFound, redirect } from 'next/navigation';
import WeddingInvitation, { ProjectData } from '@/components/invitation/WeddingInvitation';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';

const TEMPLATE_NAME_TO_THEME: Record<string, string> = {
  'sunda': 'sunda',
  'jawa': 'jawa',
  'manado': 'manado',
  'snap foto': 'snapfoto',
  'snapfoto': 'snapfoto',
};

const RESERVED_PATHS = [
  'admin', 'client', 'api', 'login', 'landing', 'invitation',
  'preview', '_next', 'favicon.ico', 'public',
];

async function getProjectByCustomUrl(customUrl: string) {
  try {
    await connectToDatabase();
    const project = await Project.findOne({ customUrl }).populate('themeId').lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error('Failed to fetch project by customUrl:', error);
    return null;
  }
}

export default async function InvitationByCustomUrlPage(
  props: { params: Promise<{ customUrl: string }> }
) {
  const { customUrl } = await props.params;

  if (RESERVED_PATHS.includes(customUrl.toLowerCase())) {
    return notFound();
  }

  const project = await getProjectByCustomUrl(customUrl);
  if (!project) return notFound();

  const sourceCodeUrl: string = project.themeId?.sourceCodeUrl || '';
  const hasUploadedTemplate = sourceCodeUrl && !sourceCodeUrl.endsWith('.zip');

  // ── Uploaded HTML template → redirect to API that serves injected HTML ───
  if (hasUploadedTemplate) {
    redirect(`/api/invitation/${customUrl}`);
  }

  // ── Built-in React theme (fallback) ──────────────────────────────────────
  let themeKey = 'sunda';
  if (project.themeId?.templateName) {
    const nameLower = project.themeId.templateName.toLowerCase();
    for (const [key, value] of Object.entries(TEMPLATE_NAME_TO_THEME)) {
      if (nameLower.includes(key)) {
        themeKey = value;
        break;
      }
    }
  }

  const projectData: ProjectData = {
    _id: project._id,
    coupleName: project.coupleName,
    groomFullName: project.groomFullName,
    groomParents: project.groomParents,
    groomInstagram: project.groomInstagram,
    groomPhoto: project.groomPhoto,
    brideFullName: project.brideFullName,
    brideParents: project.brideParents,
    brideInstagram: project.brideInstagram,
    bridePhoto: project.bridePhoto,
    gallery: project.gallery || [],
    eventDate: project.eventDate,
    eventTime: project.eventTime,
    eventTimezone: project.eventTimezone,
    venue: project.venue,
    mapsUrl: project.mapsUrl,
    youtubeUrl: project.youtubeUrl,
    enableRsvp: project.enableRsvp,
    enableGuestbook: project.enableGuestbook,
    bankName: project.bankName,
    bankAccount: project.bankAccount,
    bankHolder: project.bankHolder,
  };

  return (
    <main>
      <WeddingInvitation
        theme={themeKey}
        projectData={projectData}
        isDemo={false}
      />
    </main>
  );
}
