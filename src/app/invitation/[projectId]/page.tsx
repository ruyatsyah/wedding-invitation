import { redirect, notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';

// Legacy route — redirect to the customUrl-based route
async function getCustomUrl(id: string) {
  try {
    await connectToDatabase();
    const project = await Project.findById(id).select('customUrl').lean();
    if (!project) return null;
    return (project as any).customUrl as string;
  } catch {
    return null;
  }
}

export default async function LegacyInvitationPage(
  props: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await props.params;
  const customUrl = await getCustomUrl(projectId);

  if (!customUrl) return notFound();

  redirect(`/${customUrl}`);
}
