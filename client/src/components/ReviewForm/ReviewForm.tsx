/* eslint-disable indent */
import reviewSchema from '@/lib/schemas/ReviewSchema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';

type FormSchema = typeof reviewSchema;

interface ReviewFormProps {
  formSchema: FormSchema;
  onSubmit: (values: z.infer<FormSchema>) => void;
  loading?: boolean;
  defaultValues?: z.infer<FormSchema>;
}

// This component works as an interface for the CreateReview and UpdateReview forms.
// It receives a formSchema, onSubmit function and loading state as props.
const ReviewForm = ({
  formSchema,
  onSubmit,
  loading,
  defaultValues,
}: ReviewFormProps) => {
  const form = useForm<z.infer<FormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          beerName: '',
          rating: '0',
          text: '',
        },
  });

  return (
    <Card className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="beerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beer name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-card"
                    placeholder="Beer name..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>The name of the beer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    className="bg-card"
                    placeholder="Rating..."
                    type="number"
                    min={0}
                    max={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How many stars would you give the beer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-card"
                    placeholder="Review..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>A written review of the beer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ReviewForm;
