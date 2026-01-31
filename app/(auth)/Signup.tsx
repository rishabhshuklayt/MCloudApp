import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { User, Mail, Lock, Phone, Calendar, ArrowRight, ArrowLeft } from 'lucide-react-native';
import * as z from 'zod';
import { router } from 'expo-router';

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(8, "Security requires 8+ characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});



const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const { control, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange"
  });

  const handleNext = async () => {
    // Only validate fields for the current step
    const fields = step === 1 ? ['firstName', 'lastName', 'dob'] : ['email', 'phone'];
    const isValid = await trigger(fields as any);
    
    if (isValid) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setStep(prev => prev + 1);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-surface">
      <View className="flex-1 px-8 pt-12">
        
        {/* Progress Bar */}
        <View className="flex-row gap-x-2 mb-10">
          {[1, 2, 3].map((i) => (
            <View key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </View>

        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-poppins-bold text-secondary">Create Account</Text>
          <Text className="text-muted font-poppins-reg text-base">Step {step} of {totalSteps}</Text>
        </View>

        {/* Step 1: Identity */}
        {step === 1 && (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="gap-y-6">
            <InputItem control={control} name="firstName" icon={<User size={20} color="#64748b"/>} placeholder="First Name" error={errors.firstName?.message} />
            <InputItem control={control} name="lastName" icon={<User size={20} color="#64748b"/>} placeholder="Last Name" error={errors.lastName?.message} />
            <InputItem control={control} name="dob" icon={<Calendar size={20} color="#64748b"/>} placeholder="YYYY-MM-DD" keyboardType="numeric" error={errors.dob?.message} />
          </Animated.View>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="gap-y-6">
            <InputItem control={control} name="email" icon={<Mail size={20} color="#64748b"/>} placeholder="Email Address" keyboardType="email-address" error={errors.email?.message} />
            <InputItem control={control} name="phone" icon={<Phone size={20} color="#64748b"/>} placeholder="Phone Number" keyboardType="phone-pad" error={errors.phone?.message} />
          </Animated.View>
        )}

        {/* Step 3: Security */}
        {step === 3 && (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft} className="gap-y-6">
            <InputItem control={control} name="password" icon={<Lock size={20} color="#64748b"/>} placeholder="Password" secureTextEntry error={errors.password?.message} />
            <InputItem control={control} name="confirmPassword" icon={<Lock size={20} color="#64748b"/>} placeholder="Confirm Password" secureTextEntry error={errors.confirmPassword?.message} />
          </Animated.View>
        )}

        {/* Navigation Buttons */}
        <View className="flex-row gap-x-4 mt-12">
          {step > 1 && (
            <TouchableOpacity onPress={() => setStep(s => s - 1)} className="h-16 w-16 rounded-2xl border border-border items-center justify-center bg-white">
              <ArrowLeft color="#0f172a" size={24} />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            onPress={step === totalSteps ? handleSubmit((data) => router.push('./OTPScreen')) : handleNext}
            className="flex-1 h-16 bg-secondary rounded-2xl items-center justify-center flex-row shadow-lg shadow-slate-200"
          >
            <Text className="text-white font-poppins-bold text-lg mr-2">
              {step === totalSteps ? "Finish" : "Next Step"}
            </Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Reusable Input Component for the whole app
const InputItem = ({ control, name, icon, error, ...props }: any) => (
  <View>
    <View className="flex-row items-center border-b border-border py-3">
      {icon}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput 
            className="flex-1 ml-4 font-poppins-medium text-secondary text-lg"
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#94a3b8"
            {...props}
          />
        )}
      />
    </View>
    {error && <Text className="text-red-500 font-poppins-reg text-[10px] mt-1 uppercase tracking-tighter">{error}</Text>}
  </View>
);

export default RegisterScreen;